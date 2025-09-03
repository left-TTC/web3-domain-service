export type PrevStyles = {
    position: string;
    top: string;
    left: string;
    width: string;
    overflow: string;
    paddingRight: string;
    htmlOverscroll: string;
};

export let __locked = false;
export let __scrollY = 0;
export let __prevStyles: PrevStyles | null = null;
export let __wheelHandler: (e: Event) => void;
export let __touchHandler: (e: TouchEvent) => void;
export let __keydownHandler: (e: KeyboardEvent) => void;

export function lockYScroll(): void {
    if (__locked) return;
    __locked = true;

    __scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;

    const body = document.body;
    const html = document.documentElement;

    __prevStyles = {
        position: body.style.position || '',
        top: body.style.top || '',
        left: body.style.left || '',
        width: body.style.width || '',
        overflow: body.style.overflow || '',
        paddingRight: body.style.paddingRight || '',
        htmlOverscroll: html.style.overscrollBehavior || '',
    };

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const computedPaddingRight = parseFloat(window.getComputedStyle(body).paddingRight || '0');
    if (scrollbarWidth > 0) {
        body.style.paddingRight = `${computedPaddingRight + scrollbarWidth}px`;
    }

    body.style.position = 'fixed';
    body.style.top = `-${__scrollY}px`;
    body.style.left = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none'; 

    __wheelHandler = (e: Event) => {
        e.preventDefault();
    };
    __touchHandler = (e: TouchEvent) => {
        e.preventDefault();
    };
    __keydownHandler = (e: KeyboardEvent) => {
        const blockKeys = new Set([
        'ArrowUp',
        'ArrowDown',
        'PageUp',
        'PageDown',
        'Home',
        'End',
        ' ',
        'Spacebar', 
        ]);
        if (blockKeys.has(e.key)) {
        e.preventDefault();
        }
    };

    window.addEventListener('wheel', __wheelHandler, { passive: false });
    window.addEventListener('touchmove', __touchHandler, { passive: false });
    window.addEventListener('keydown', __keydownHandler, { passive: false });
}


export function unlockYScroll(): void {
    if (!__locked) return;
    __locked = false;

    const body = document.body;
    const html = document.documentElement;

    window.removeEventListener('wheel', __wheelHandler);
    window.removeEventListener('touchmove', __touchHandler);
    window.removeEventListener('keydown', __keydownHandler);

    if (__prevStyles) {
        body.style.position = __prevStyles.position;
        body.style.top = __prevStyles.top;
        body.style.left = __prevStyles.left;
        body.style.width = __prevStyles.width;
        body.style.overflow = __prevStyles.overflow;
        body.style.paddingRight = __prevStyles.paddingRight;
        html.style.overscrollBehavior = __prevStyles.htmlOverscroll;
    } else {
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.width = '';
        body.style.overflow = '';
        body.style.paddingRight = '';
        html.style.overscrollBehavior = '';
    }

    window.scrollTo(0, __scrollY);

    __prevStyles = null;
}

