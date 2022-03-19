const client = require('@sanity/client')

// init sanity client
const sanityClient = client({
    projectId: 'l13bl0of',
    dataset: 'production',
    useCdn: true
})

module.exports = async function () {
    const results = await sanityClient.fetch(
        `*[_type == "result"]`
    )
    console.log(results)
    return results
}