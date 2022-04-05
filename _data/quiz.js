const client = require('@sanity/client')

// init sanity client
const sanityClient = client({
    projectId: 'l13bl0of',
    dataset: 'production',
    useCdn: false
})

module.exports = async function () {
    const quiz = await sanityClient.fetch(
        `*[_type == "quiz"]{
            "title": title,
            "slug": slug.current,
            questions[]->
        }`
    )
    console.log(quiz)
    return quiz
}