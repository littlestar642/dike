import configData from '../../appsettings.json';

/**
 * Get config values from appsettings.json
 * @param key Config location key ':' seperated
 * @returns config value
 */
function GetConfig (key: string): any {
    let response = JSON.parse(JSON.stringify(configData));
    let isValid = true;
    const keySegments = key.split(':');
    keySegments.forEach(i => {
        if (response.hasOwnProperty(i)) {
            response = JSON.parse(JSON.stringify(response[i]));
        } else {
            isValid = false;
            return;
        }
    });

    try {
        return isValid ? response : null;
    } catch (er) {
        return null;
    }
}

export default GetConfig;
