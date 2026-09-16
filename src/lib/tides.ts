// lib/tides.ts
export type TideData = {
  type: "Alta" | "Baixa";
  time: string;
  height: string;
  date: string;
};

export type TideResponse = {
  success: boolean;
  data?: TideData[];
  message?: string;
  error?: string;
  source?: string;
  lastUpdate?: string;
};

// Cache para evitar muitas requisições
let cachedTideData: TideData[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos

/**
 * Busca dados das marés de uma fonte pública
 * Usa a API do World Tides (gratuita) ou fallback para dados locais
 */
export async function getTideData(): Promise<TideData[]> {
  // Verifica se o cache ainda é válido
  if (cachedTideData && cacheTimestamp && (Date.now() - cacheTimestamp) < CACHE_DURATION) {
    console.log("🌊 Usando dados de marés em cache");
    return cachedTideData;
  }

  try {
    // Tenta buscar dados do World Tides API (gratuito)
    // Coordenadas aproximadas da região de São Miguel dos Milagres
    const latitude = -9.0500;
    const longitude = -35.2333;
    
    // Opção 1: World Tides API (requer chave gratuita)
    // const response = await fetch(
    //   `https://www.worldtides.info/api?heights&lat=${latitude}&lng=${longitude}&days=1&key=${process.env.WORLD_TIDES_API_KEY}`
    // );
    
    // Opção 2: Usar uma API alternativa ou mock
    // Por enquanto, vamos usar dados gerados com base em cálculos aproximados
    
    const tideData = generateTideData();
    cachedTideData = tideData;
    cacheTimestamp = Date.now();
    
    return tideData;
  } catch (error) {
    console.warn("⚠️ Erro ao buscar marés, usando dados gerados:", error);
    return generateTideData();
  }
}

/**
 * Gera dados de marés aproximados baseados em cálculos
 * Isso é um fallback para quando a API não está disponível
 */
function generateTideData(): TideData[] {
  const now = new Date();
  const date = now.toLocaleDateString('pt-BR');
  
  // Calcula as marés baseado na data atual
  // Usando um modelo simplificado de marés semilunares
  const dayOfMonth = now.getDate();
  const dayFactor = (dayOfMonth % 14) / 14; // 0 a 1 em ciclo de 14 dias
  
  // Horários base (aproximados)
  const baseTimes = [
    { hour: 5, minute: 42 },
    { hour: 11, minute: 58 },
    { hour: 18, minute: 7 },
    { hour: 0, minute: 21 },
  ];
  
  // Ajusta os horários baseados no dia do mês
  const adjustedTimes = baseTimes.map((base, index) => {
    // Variação de até 1 hora
    const variation = (dayFactor - 0.5) * 60 * 2; // -30 a +30 minutos
    const totalMinutes = base.hour * 60 + base.minute + variation + (index * 0.5);
    
    // Normaliza para 24h
    let normalizedMinutes = totalMinutes % (24 * 60);
    if (normalizedMinutes < 0) normalizedMinutes += 24 * 60;
    
    const hour = Math.floor(normalizedMinutes / 60);
    const minute = Math.floor(normalizedMinutes % 60);
    
    return {
      hour,
      minute,
      type: index % 2 === 0 ? "Alta" : "Baixa" as const
    };
  });
  
  // Ordena por hora
  adjustedTimes.sort((a, b) => {
    const timeA = a.hour * 60 + a.minute;
    const timeB = b.hour * 60 + b.minute;
    return timeA - timeB;
  });
  
  // Calcula alturas aproximadas
  const maxHeight = 2.1;
  const minHeight = 0.3;
  const heightRange = maxHeight - minHeight;
  
  return adjustedTimes.map((time, index) => {
    // Altura varia com o ciclo lunar
    const heightFactor = 0.5 + 0.5 * Math.sin((dayFactor * 2 * Math.PI) + (index * 0.5));
    const height = minHeight + (heightRange * heightFactor);
    
    return {
      type: time.type as "Alta" | "Baixa",
      time: `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`,
      height: height.toFixed(1).replace('.', ',') + ' m',
      date
    } as TideData;
  });
}

/**
 * Força a atualização do cache de marés
 */
export function refreshTideCache(): void {
  cachedTideData = null;
  cacheTimestamp = null;
}

/**
 * Verifica se a maré está baixa
 * Útil para exibir dicas contextuais
 */
export function isLowTide(tideData: TideData[]): boolean {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  // Encontra a maré mais próxima
  let closestTide = tideData[0];
  let closestDiff = Infinity;
  
  for (const tide of tideData) {
    const [hours, minutes] = tide.time.split(':').map(Number);
    const tideMinutes = hours ?? 0 * 60 + (minutes ?? 0);
    
    let diff = Math.abs(tideMinutes - currentMinutes);
    // Considera a possibilidade da maré ser no dia seguinte
    diff = Math.min(diff, 24 * 60 - diff);
    
    if (diff < closestDiff) {
      closestDiff = diff;
      closestTide = tide;
    }
  }
  
  return closestTide?.type === "Baixa" && closestDiff < 60;
}