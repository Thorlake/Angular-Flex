
import { Directive, Input, ElementRef, HostListener, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[badge]'
})
export class UpdateBadgeDirective implements AfterViewInit {
  private dotsClass = 'three-dots';

  @Input() public badge: HTMLSpanElement;

  @HostListener('window:resize') onResize() {
    this.updateBadgeInformation();
  }

  ngAfterViewInit() {
    // Avoid AfterContentChecked
    setTimeout(() => {
      this.updateBadgeInformation();
    });
  }

  constructor(public elem: ElementRef, public renderer: Renderer2) {
  }

  private updateBadgeInformation() {
    const toColumn = this.elem.nativeElement;
    if (!toColumn || !toColumn.clientWidth) {
      return;
    }

    // Padding
    const columnStyles = getComputedStyle(toColumn);
    const getToColumnPadding = (propertyName) => parseInt(columnStyles.getPropertyValue(propertyName), 10);
    const paddingWidth = getToColumnPadding('padding-left') + getToColumnPadding('padding-right');

    let hiddenCount = <number>toColumn.children.length;
    // No meaning to do anything if there are no children
    if (hiddenCount === 1) {
      return;
    }

    let takenWidth = 0;
    let lastShownChild;
    const rowWidth = toColumn.clientWidth - paddingWidth;
    for (let i = 0; i < toColumn.children.length; i++) {
      const child = toColumn.children[i];
      if (child.classList.contains(this.dotsClass)) {
        child.classList.remove(this.dotsClass);
      }
      takenWidth += child.offsetWidth;
      if (takenWidth > rowWidth && i !== 0) {
        break;
      }
      lastShownChild = child;
      hiddenCount--;
    }

    if (this.badge) {
      let badgeInfo = '';
      if (hiddenCount > 0) {
        lastShownChild.classList.add(this.dotsClass);
        badgeInfo = '+' + hiddenCount;
      }

      this.badge.innerHTML = badgeInfo;
    }
  }
}
