import i18n from "@/i18n"
import type { PublicKey } from "@solana/web3.js"


export function generateInvitePromo(
    downloadUrl: string,
    siteUrl: string,
    usrKey: PublicKey,
    language?: string
) {
    const t = language ? i18n.getFixedT(language) : i18n.t

    const inviteLink = `${siteUrl}/#/index/?r=${usrKey}`
    const browserOpenLink = `https://dns.kilo/#/?r=${usrKey}`

    const message = `
💰 ${t("makeMoneyInDecentralizedWeb")}

${t("newAnonymousDomainEcosystemLaunching")} 🚀

${t("earlyUsersCan")}:
✨ ${t("registerRareDomains")}
💸 ${t("resellDomainsForProfit")}
👥 ${t("earnRewardsByInvitingOthers")}

${t("accessFullyAnonymousWebsites")} 🌐

⬇️ ${t("downloadTheBrowser")}
${downloadUrl}

🔗 ${t("joinUsingMyInviteLink")}
${inviteLink}

🧭 ${t("alreadyInstalledKilo")}
${t("openDirectly")}:
${browserOpenLink}

⚡ ${t("earlyUsersGetBiggestAdvantage")}
    `

    return message.trim()
}
