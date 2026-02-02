import Constants from 'expo-constants';
import { Platform } from 'react-native';

const fetchWithTimeout = async (url, options = {}, timeoutMs = 2500) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
};

export const getApiBase = async () => {
  const extra = Constants.expoConfig?.extra ?? {};
  const { API_URL, PORT } = extra;

  const candidates = [];

  // 1) If API_URL is a full URL, try exactly that
  if (typeof API_URL === 'string' && API_URL.startsWith('http')) {
    candidates.push(API_URL);
  }

  // 2) If we have a port (from API_URL when it's numeric or PORT), build common hosts
  const port = (typeof API_URL === 'string' && !isNaN(Number(API_URL))) ? API_URL : PORT;
  if (port) {
    // Android emulator
    if (Platform.OS === 'android') candidates.push(`http://10.0.2.2:${port}`);
    // iOS sim / web on same machine
    candidates.push(`http://localhost:${port}`);
    // Try to derive LAN IP from hostUri (useful for real device)
    const hostUri = Constants.expoConfig?.hostUri; // e.g. 192.168.0.100:19000
    const lanIp = hostUri?.split(':')?.[0];
    if (lanIp && /^\d+\.\d+\.\d+\.\d+$/.test(lanIp)) {
      candidates.push(`http://${lanIp}:${port}`);
    }
  }

  // 3) If running on web, also try current origin
  // Guard: window may be undefined on native
  try {
    if (typeof window !== 'undefined' && window.location?.origin) {
      candidates.push(window.location.origin);
    }
  } catch {}

  // De-duplicate while preserving order
  const unique = [...new Set(candidates)];

  // Probe /api/health on each candidate and return the first that responds
  for (const base of unique) {
    try {
      const res = await fetchWithTimeout(`${base}/api/health`, { method: 'GET' }, 1500);
      if (res.ok) return base;
    } catch {}
  }

  // As a last resort, return the first candidate or undefined
  return unique[0];
};

export default getApiBase;

