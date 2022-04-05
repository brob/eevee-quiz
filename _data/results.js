const client = require('@sanity/client')
const toMarkdown = require('@sanity/block-content-to-markdown')

const serializers = {
  types: {
    code: props => '```' + props.node.language + '\n' + props.node.code + '\n```'
  }
}

// init sanity client
const sanityClient = client({
    projectId: 'l13bl0of',
    dataset: 'production',
    useCdn: true
})
function prepData(data) {
    data.body = toMarkdown(data.body,{serializers})

    return data
}

module.exports = async function () {
    const results = await sanityClient.fetch(
        `*[_type == "result"]{
            ...,
            "slug": slug.current,
        }`
    )
    const prepped = results.map(prepData)
    return prepped
}