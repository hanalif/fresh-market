import { Pipe, PipeTransform } from '@angular/core';




@Pipe({
  name: 'titleUppercaseLetters'
})
export class titleUppercaseLettersPipe implements PipeTransform {


  transform(title: string): string {

      let newTitle = title.replace('-',' ');

      let newTitleArr = newTitle.split(' ');

      for(let i = 0; i < newTitleArr.length; i++){
        newTitleArr[i] = newTitleArr[i][0].toUpperCase() + newTitleArr[i].substring(1);
      }

      newTitle = newTitleArr.join(' ');

      return newTitle;

    }

}
