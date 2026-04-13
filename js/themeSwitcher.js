const dark_icon=document.querySelector('.dark_icon');
const light_icon=document.querySelector('.light_icon');
const download_btn=document.getElementById('download_btn');






const savedTheme=localStorage.getItem('theme');

if(savedTheme==='dark'){
    light_icon.style.display='block';
    dark_icon.style.display='none';
    document.body.classList.add('dark-theme');
}



dark_icon.addEventListener('click',()=>{
    light_icon.style.display='block';
    dark_icon.style.display='none';

    document.body.classList.add('dark-theme');
    localStorage.setItem('theme','dark');
    
})

light_icon.addEventListener('click',()=>{   
    dark_icon.style.display='block';
    light_icon.style.display='none';
    document.body.classList.remove('dark-theme');

    localStorage.setItem('theme','light');
})