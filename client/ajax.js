export default async function () {
    try {
        const result = await fetch('/api')
        const data = await result.json();
        return data;
    } catch (err) { console.error(err) }
}