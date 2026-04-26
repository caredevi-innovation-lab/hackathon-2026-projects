import { useCallback, useState } from 'react';
import { predictRisk } from '../services/apiService.js';

/**
 * Hook for managing risk prediction state.
 * Handles loading, error, and result state for AI risk assessments.
 *
 * Usage:
 *   const { prediction, loading, error, runPrediction } = useRisk();
 *   await runPrediction({ age: 28, systolicBP: 140, ... });
 */
export function useRisk() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runPrediction = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await predictRisk(payload);
      const pred = result?.prediction || result;
      setPrediction(pred);
      return pred;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Risk prediction failed';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setPrediction(null);
    setError(null);
    setLoading(false);
  }, []);

  return { prediction, loading, error, runPrediction, reset };
}
