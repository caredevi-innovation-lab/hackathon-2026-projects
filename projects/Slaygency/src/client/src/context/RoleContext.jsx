import { createContext, useContext, useMemo } from 'react';
import { AuthContext } from './AuthContext.jsx';

export const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const { user } = useContext(AuthContext);
  const role = user?.role || 'Patient';

  const value = useMemo(
    () => ({
      role,
      isPatient: role === 'Patient',
      isHealthWorker: role === 'HealthWorker',
      isDoctor: role === 'Doctor',
      isAdmin: role === 'Admin',
    }),
    [role]
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}
