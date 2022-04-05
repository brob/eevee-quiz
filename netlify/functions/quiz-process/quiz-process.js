var qs = require('querystring');


const getValues = (string) => {
  // convert string of key=value&key=value to object
  const obj = {};
  string.split('&').forEach(function(item) {
    const parts = item.split('=');
    obj[parts[0]] = parseFloat(parts[1]);
  }
  );
  return obj;
}

// function to merge an array of objects
// when keys are the same, add the two values together
function mergeObjs(arr) {
  const obj = {};
  arr.forEach(function(item) {
    Object.keys(item).forEach(function(key) {
      if (obj[key]) {
        obj[key] += item[key];
      } else {
        obj[key] = item[key];
      }
    });
  });
  return obj;
}

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    const subject = event.queryStringParameters.name || 'World'
    // get post body
    console.log('hi')
    const body = qs.parse(event.body)
    const values = Object.values(body).map(getValues);
    console.log({values})
    console.log(mergeObjs(values))
    const merged = mergeObjs(values)

    // get highest value key from merged
    const highest = Object.keys(merged).reduce(function(a, b){ return merged[a] > merged[b] ? a : b });
    console.log({highest})

    return {
      statusCode: 302,
      headers: {
        Location: '/result/' + highest + '/'
      }
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
