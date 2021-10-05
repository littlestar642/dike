class Common {
    static async makePostRequest (url: string, body: object, headers: HeadersInit): Promise<string> {
        let content = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });
        if (content !== null) {
            return await content.text();
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