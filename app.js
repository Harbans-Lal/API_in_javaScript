let curruntPage = 1;
// console.log('currentPage', curruntPage);
let pageSize = 6;
let pagiNation;
async function get_data(){
    try{
        let response = await fetch("https://jsonplaceholder.typicode.com/todos/");
        let data = await response.json();
        return data;
    }catch(error){
        throw error;
    }

}
//render json data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

async function renderData(){
    let tBody = document.getElementById("tableBody");
    let allData = await get_data() ; 


    if(!allData){
        throw error("some error occur");

    }else{
        function renderTable(data,page){
            tBody.innerHTML = "";
            let start = (page - 1) * pageSize;
            let end = start + pageSize;
            pagiNation = data.slice(start ,end);

            pagiNation?.map(item =>{
                let row = document.createElement('tr');
                for(let value in item){
                   let cell = document.createElement('td');
                   cell.textContent = item[value];
                   row.appendChild(cell);
                }
                tBody.appendChild(row);


            })

        }              
        
        renderTable(allData,curruntPage);


        //next and pervious button start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

        let nextBtn  = document.getElementById('nextPagination');
        let prevBtn = document.getElementById('pervPaginaiton');
             
        nextBtn.addEventListener('click',()=>{
            console.log(curruntPage);
            if(curruntPage < Math.ceil(allData.length / pageSize)){
                curruntPage++ ; 
                renderTable(allData, curruntPage);
                }
             })   
             console.log(curruntPage);            
         prevBtn.addEventListener('click', ()=>{
        if(curruntPage > 1){
            curruntPage-- ;
            renderTable(allData, curruntPage);
             }
        })     
        //next and pervious button end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

       

        //data is getting sort basend on uvalue>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

        // const tableHead = document.getElementById('tableHead');
        const tableHead = document.getElementById('tablHeading');

        let isAscending  = true;
        let theValue;
        tableHead.addEventListener( 'click', function(event){
            isAscending = !isAscending;
            theValue = event.target.innerHTML;

            console.log(theValue);

            tBody.innerHTML = "";

            const toggleData = pagiNation.sort((a,b) =>{
                if(isAscending){
                    return a.id - b.id;
                    // return (`a.${theValue} - b.${theValue}`);
                }else{
                    return b.id - a.id;
                    // return (`b.${theValue} - a.${theValue} `);
                }
            })
            curruntPage = 1;
            renderTable(toggleData,curruntPage);
        })


        //search the data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..
        let searchBtn = document.getElementById('searchBtn');

        searchBtn.addEventListener('click',  function(){
            tBody.innerHTML = "";
            let searchData;
            let inputValue = document.getElementById('searchElement').value;

            if(inputValue == ""){
                searchData = allData;
            }else{
                searchData = allData.filter((item) => item.title.includes(inputValue));
            }
            curruntPage = 1;
            renderTable(searchData,curruntPage);
        })
    
    }
}
 
renderData();