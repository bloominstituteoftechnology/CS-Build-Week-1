let glider = [404,  435, 463, 464, 465];
let small_exploder = [314,  343, 344, 345, 373, 375, 404];
let exploder = [312,  314, 316, 342, 346, 372, 376, 402, 406, 432, 434, 436];
let spaceship = [337,  338, 339, 340, 366, 370, 400, 426, 429];
let random = Array(300);
for (let i=0; i<random.length; i++) {
  random[i] = Math.floor(Math.random()*900);
}

const presets = {
  "glider": glider,
  "small_exploder": small_exploder,
  "exploder": exploder,
  "spaceship": spaceship,
  "random": random
};

export default presets;
