function hezyon(arr1: number[], arr2:number[]){
  let arr3 = [...arr1,...arr2];
  arr3.sort();
  let index = (arr3.length)/ 2;
  let hezyon = arr3[index]

  return hezyon;

}

function hezyon2(arr1: number[], arr2:number[]){
  let hezyon = 0;
  let arr1Length = arr1.length;
  let arr2Length =  arr2.length;

  let arr3 = [];
  let i = 0;
  let j = 0;

  while(i < arr1Length && j < arr2Length){
    if(arr1[i] < arr2[j]){
      arr3.push(arr1[i]);
      i++;
    }else{
      arr3.push(arr2[j]);
      j++;
    }
  }

  while( i < arr1Length){
    arr3.push(arr1[i]);
  }

  while(j< arr2Length){
    arr3.push(arr2[j]);
  }


  return hezyon;

}
