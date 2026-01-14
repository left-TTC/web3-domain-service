



export async function getTop20AccountsByPrice(programId: string, apiKey: string) {
    const url = `https://api.helius.xyz/v0/addresses/${programId}/accounts?api-key=${apiKey}`;

    const body = {
        filters: {
            fields: {
                highest_price: { "$gte": 0 }
            }
            },
        orderBy: {
            field: "highest_price",
            direction: "desc"
        },
        limit: 20
    };

    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const data = await res.json();
    return data;
}