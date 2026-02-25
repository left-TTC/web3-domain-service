const reserved_roots = [
    "com", "org", "net", "edu", "gov", "mil", "int",
    "io", "co", "uk", "us", "de", "fr", "cn", "jp",
    "au", "ca", "ru", "in", "br", "mx", "es", "it",
    "nl", "be", "ch", "se", "no", "dk", "fi", "pl",
    "kr", "tw", "hk", "sg", "my", "th", "vn", "ph",
    "id", "tr", "sa", "ae", "za", "eg", "ng", "ar",
    "cl", "co", "ve", "kr", "nz", "ie", "gr", "pt",
];


export function validRootDomain(root: string): boolean {

    if (root.length > 16) return false

    if(reserved_roots.includes(root))return false

    return true
}