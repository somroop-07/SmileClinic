import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slotName'
})
export class SlotNamePipe implements PipeTransform {

  private slotMapping: { [key: number]: string } = {
    1: '12:00 - 13:00',
    2: '13:00 - 14:00',
    3: '14:00 - 15:00',
    4: '15:00 - 16:00',
    5: '16:00 - 17:00',
    6: '17:00 - 18:00'
  };
  transform(slotId: number): string {
    return this.slotMapping[slotId] || 'Unknown Slot';
  }

}
