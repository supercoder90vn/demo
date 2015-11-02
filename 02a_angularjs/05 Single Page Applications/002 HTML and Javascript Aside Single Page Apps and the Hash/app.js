window.addEventListener('hashchange',function(){
    console.log('Hash changed!: ' + window.location.hash);
    if( window.location.hash === '#bookmark1'){
        console.log('Page 1 is cool');
    }
    if( window.location.hash === '#/bookmark/2'){
        console.log('Le me go get Page 2.');
    }
});