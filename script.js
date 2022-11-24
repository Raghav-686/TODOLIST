//save in localStorage
function submit1()
{
    var localStorageData = localStorage.getItem('data');
    var id = document.getElementById('item').value;
    // console.log(id.value);
    if(localStorage.getItem('edit'))
    {
        let localStorageedit = JSON.parse(localStorage.getItem('edit'));
        localStorageData = JSON.parse(localStorageData);
        let idx = localStorageData.indexOf(localStorageedit);
        console.log(idx);
        localStorageData[idx]=id;
        console.log(localStorageData);
        // localStorage.setItem('data', JSON.stringify(localStorageData));
        localStorage.removeItem('edit');
    }
    
    else
    {
        if(id.value=="")
        {
            alert('please enter the list');
            return;
        }
        
        console.log(localStorageData);
        if (!localStorageData) {
            localStorageData = [];
        } else {
            localStorageData = JSON.parse(localStorageData);
        }
        if(localStorageData.includes(id))
        {
            return;
        }
        localStorageData.push(id);
    }

    localStorage.setItem('data', JSON.stringify(localStorageData));  
}

//ADD list
function addData()
{
    var bodystr=``;
    let localStorageData = localStorage.getItem('data');
    if(localStorageData)
    {
        localStorageData = JSON.parse(localStorageData);
        for(let data of localStorageData)
    {
        bodystr = `${bodystr}
        <li class="list-group-item" id="${data}">${data}<button class="edit" style="float: right;" onclick="edit('${data}')">EDIT</button><button onclick="press('${data}')" class="del btn btn-danger btn-sm float-right delete">X</button></li>`;
    }
        document.getElementById('items').innerHTML = bodystr;
    }
    
}

//delete the list
function press(id)
{
    console.log(id);
    let localStorageData = JSON.parse(localStorage.getItem('data'));
    let idx = localStorageData.indexOf(id);
    localStorageData.splice(idx,1);
    console.log();
    localStorage.setItem('data', JSON.stringify(localStorageData));
    addData();
}

document.querySelector('#filter').addEventListener('input' , search); 

//search value
function search()
{
    const searchList = document.querySelector('#filter');
    const str = searchList.value.toLowerCase();
    const list = document.querySelectorAll('.list-group-item')
    // console.log(list[0]);

    for(let i=0;i<list.length;i++)
    {
        let text = list[i].textContent;
        if(text.toLocaleLowerCase().includes(str.toLocaleLowerCase()))
        {
            list[i].style.display="block";
        }
        else
        {
            list[i].style.display="none";
        }
    }
}


//edit value
function edit(data)
{
    document.getElementById('item').value = data;
    localStorage.setItem('edit',JSON.stringify(data));
}



const theme = document.querySelectorAll(`[name="theme"]`);
console.log(theme);

const storeTheme = function(theme)
{
    localStorage.setItem('theme',theme);
}

theme.forEach(themeoption => {
    themeoption.addEventListener('click',()=>{
        storeTheme(themeoption.id);
    })
});

const applyTheme = function()
{
    const activetheme = localStorage.getItem('theme');

    document.getElementById(activetheme).checked = true;
}
document.onload = applyTheme();