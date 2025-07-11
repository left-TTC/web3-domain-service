import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { WalletEnvironmentProvider } from './provider/walletEnviroment/walletEnviromentProvider.tsx'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n.ts'
import { RootDomainEnviromentProvider } from './provider/rootDomainEnviroment/rootDomainEnviromentProvider.tsx'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <WalletEnvironmentProvider>
            <RootDomainEnviromentProvider>
                    <I18nextProvider i18n={i18n}>
                        <App />
                    </I18nextProvider> 
            </RootDomainEnviromentProvider>
        </WalletEnvironmentProvider>
    </StrictMode>,
)
