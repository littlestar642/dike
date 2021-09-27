
/**
 * @param {string} url url of the page to be loaded
 * @param {*} element element object in which the page is to be loaded
 * @param {*} options page request options
 */
const load = async (url, element, options={method: "GET"}) => {
    let content = await (await fetch(url, options)).text();
    element.innerHTML = content;
    let scripts = element.querySelectorAll('script');
    scripts.forEach(script => {
        let tmp = document.createElement('script');
        tmp.type = script.type || 'text/javascript';
        if (script.hasAttribute('src')) tmp.src = script.src;
        tmp.innerHTML = script.innerHTML;
        document.head.appendChild(tmp);
        document.head.removeChild(tmp);
    });
}