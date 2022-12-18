
export default function (id)
{
    if(document.getElementById(id).getAttribute('data-visible') === "true")
    {
        document.getElementById(id).style.display = 'none';
        document.getElementById(id).setAttribute('data-visible','false');
        console.log("oke");
    }
    else
    {
        document.getElementById(id).style.display = 'flex';
        document.getElementById(id).setAttribute('data-visible','true');
        console.log(" not oke");
    }

};

