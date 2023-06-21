exports.parseToken = (header, payload, token) => {
    return header + '.' + payload + '.' + token;
}

