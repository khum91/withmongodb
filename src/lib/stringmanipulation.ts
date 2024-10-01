const randomString = (length: number) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const len = chars.length;
    let random = '';
    for (let i = 0; i < length; i++) {
        const posN = Math.ceil(Math.random() * (len - 1));
        random += chars[posN];
    }

    return random;
}

const filename = (file: File) => {
    const ext = file.name.split('.').pop();
    const random = Math.floor(Math.random() * 9999);
    const name = randomString(20)
    const iname = name + '-' + random + '.' + ext;
    return iname
}


export {randomString, filename}