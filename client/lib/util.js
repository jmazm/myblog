export function addClass (eleOrObj, classname) {
  if(!eleOrObj.nodeType) {
    for (var className in eleOrObj)
      if (!new RegExp('\\b' + className + '\\b', 'gi').test(eleOrObj[className].className)) {
        eleOrObj[className].className = eleOrObj[className].className.concat(' ' + className);
      }
  } else if(!new RegExp('\\b' + classname + '\\b', 'gi').test(eleOrObj.className)) {
    eleOrObj.className = eleOrObj.className.concat(' ' + classname)
  }

}

export function removeClass (eleOrObj,classname) {
  if(!eleOrObj.nodeType) {
    for (var className in eleOrObj) {
      if(new RegExp('\\b' + className + '\\b', 'gi').test(eleOrObj[className].className)) {
        eleOrObj[className].className = ('' + eleOrObj[className].className + '').replace(className, '')
      }
    }
  } else if(new RegExp('\\b' + classname + '\\b', 'gi').test(eleOrObj.className)) {
    eleOrObj.className = ('' + eleOrObj.className + '').replace(classname, '');
  }
}

export function on (element,type,handler,useCap) {
  if(element.addEventListener)this.addHandler = function (element,type,handler,useCap) {
    element.addEventListener(type,handler,useCap)
  };
  else if(element.attachEvent)this.addHandler=function (element,type,handler) {
    element.attachEvent('on'+type,handler);//IE
  };
  else this.addHandler=function (element,type,handler) {
      element['on'+type]=handler;//DOM0
    };
  this.addHandler(element,type,handler,useCap);
}