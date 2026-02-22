

import "@/polyfills.ts"

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Buffer } from "buffer";

import App from './App.tsx'
import { WalletEnvironmentProvider } from './provider/walletEnviroment/walletEnviromentProvider.tsx'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n.ts'
import { RootDomainEnviromentProvider } from './provider/rootDomainEnviroment/rootDomainEnviromentProvider.tsx'
import { ModalProvider } from "./components/common/show/info.tsx";

(window as any).Buffer = Buffer;

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ModalProvider>
            <WalletEnvironmentProvider>
                <RootDomainEnviromentProvider>
                        <I18nextProvider i18n={i18n}>
                            <App />
                        </I18nextProvider> 
                </RootDomainEnviromentProvider>
            </WalletEnvironmentProvider>
        </ModalProvider>
    </StrictMode>,
)
