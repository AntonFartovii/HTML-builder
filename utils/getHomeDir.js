export function getHomedir(){
    return process.env.HOME || process.env.USERPROFILE;
}

// if (process.platform === 'win32')if (process.platform === 'win32')
// { return env.USERPROFILE || env.HOMEDRIVE + env.HOMEPATH || home || null;

//завел вторую переменную где храню текущую директорию, ее меняю в командами cd и up


// ctrl + c
// Можно перехватить process.on('SIGINT', cb())

// rl.on('SIGINT', rl.close())
// rl.on('close', () => ...)

// Подскажите, пожалуйста, я правильно понимаю техническую сторону обработки команды
// "npm run start -- --username=yourusername": мы в package.json прописываем скрипт
// на " start: node путькстартовомуфайлу". И в этом стартовом файле обрабатываем
// your_username для его дальнейшего использования а с "--" "--username"
// ничего не делаем? У меня только такой вариант выстроился