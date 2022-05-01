import { AuthProvider } from './auth-context';
import { ReactNode } from "react";
import {QueryClient, QueryClientProvider} from 'react-query'
/**
 * 全局Providers
 */
export const AppProviders = ({children}: {children: ReactNode})=>{
    // .ts报错
    return(
        <QueryClientProvider client={new QueryClient()}>
            <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
    ) 
    
    
} 