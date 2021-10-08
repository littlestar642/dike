class Common {
    static async makeApiRequest (method: 'POST' | 'GET', url: string, headers: HeadersInit, body: object = {}): Promise<string> {
        try {
            let content: any = {
                method: method,
                headers: headers
            };

            if (method === 'POST') content.body = JSON.stringify(body);
            let data = await fetch(url, content);
            if (data !== null) {
                return await data.text();
            }
        } catch (err: any) {
            console.log(err.message);
        }
        return '';
    }

    private static _regex = {
        phone: /^[6-9][0-9]{9}$/,
        otp: /^[0-9]{3}-?[0-9]{3}$/
    };

    public static get regex() {
        return Common._regex;
    }
}

export default Common;