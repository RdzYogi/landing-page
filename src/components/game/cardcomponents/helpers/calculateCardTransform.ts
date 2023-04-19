

function calculateCardTransform(total: number, index: number) {
  let transformClass = ""
  if (total % 2 === 0) {
    const reference = (total / 2) + 0.5
    if (index + 1 < reference) {
      switch (reference-(index + 1)) {
        case 0.5:
            transformClass = "-rotate-[3deg]"
          break;
        case 1.5:
            transformClass = "-rotate-[9deg] translate-y-4"
          break;
        case 2.5:
            transformClass = "-rotate-[15deg] translate-y-8"
          break;

        default:
          break;
      }
      // transformClass = "-rotate-["+ ((reference-(index + 1))*6) +"deg] "
    } else {
      switch ((index + 1)-reference) {
        case 0.5:
            transformClass = "rotate-[3deg]"
          break;
        case 1.5:
            transformClass = "rotate-[9deg] translate-y-4"
          break;
        case 2.5:
            transformClass = "rotate-[15deg] translate-y-8"
          break;
        default:
          break;
      }
      // transformClass = "rotate-["+ (((index + 1)-reference)*6) +"deg] "
    }
  }else{
    const half = total/2 + 0.5
    if(index + 1 === half){
      transformClass = "-translate-y-2"
    }
    if(index + 1  < half){
      switch (half-(index+1)) {
        case 1:
            transformClass = "-rotate-[3deg]"
          break;
        case 2:
            transformClass = "-rotate-[9deg] translate-y-4"
          break;
        case 3:
            transformClass = "-rotate-[15deg] translate-y-8"
          break;

        default:
          break;
      }
    }else{
      switch ((index + 1)-half) {
        case 1:
            transformClass = "rotate-[3deg]"
          break;
        case 2:
            transformClass = "rotate-[9deg] translate-y-4"
          break;
        case 3:
            transformClass = "rotate-[15deg] translate-y-8"
          break;

        default:
          break;
      }
    }
  }
  return transformClass
}

export default calculateCardTransform
