export default function buildURL(url, data) {
  // Create regex using the keys of the replacement object.
  var regex = new RegExp(":(" + Object.keys(data).join("|") + ")", "g");

  // Replace the string by the value in object
  return url.replace(regex, (m, $1) => data[$1] || m);
}
