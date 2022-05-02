import { AuthProvider } from './auth-context';
import { ReactNode } from "react";
import {QueryClient, QueryClientProvider} from 'react-query'
import { Provider } from 'react-redux';
import { store } from 'store';
/**
 * 全局Providers
 */
export const AppProviders = ({children}: {children: ReactNode})=>{
    // .ts报错
    return(
        <Provider store={store}>
            <QueryClientProvider client={new QueryClient()}>
                <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
        </Provider>
        
    ) 
    
    
} 