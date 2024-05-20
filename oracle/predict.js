//Prediction file for f/d types

let user_buffer = "";

var last_prediction = "f"; //Let's start with f

const inputElement = document.getElementById("input");
const table = document.getElementById("myTable");

var trials = 0;
var total_correct = 0;
var average = 0;

var averages = [100,100,100,100,100,100];

function showAlgo() {
    document.getElementById("algo").innerHTML = "Contrary to what you might think, the algorithm is very simple. It simply sees when the last five letters have been seen before and finds the letter that came after them. That’s it! Yep, that's how predictable you are. ";
}

function compute_average(){
    let new_average = (total_correct/trials)*100;
    averages.push(new_average);
    average = averages.reduce((a, b) => a + b, 0) / averages.length;
    //console.log(average);
    //console.log(new_average);

    if (averages.length > 60){
        averages.shift();
    }

    document.getElementById("percentage").innerHTML = average.toFixed(2)+"% correct predictions";
}

function keyPress(){
    if (user_buffer.length > 170){
        trials = trials + 1;

    //First, append the thing. 
    var current_input = inputElement.value;
    if ((current_input.slice(-1) == "d") || (current_input.slice(-1) == "f")){
        user_buffer = user_buffer + current_input.slice(-1);
        //console.log(user_buffer)

        if (current_input.slice(-1) == last_prediction){
            //We predicted it right!
            //console.log("We got it!");
            total_correct = total_correct + 1;
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = last_prediction;
            cell2.innerHTML = current_input.slice(-1);
            cell3.innerHTML = "Prediction correct!";

            if (table.rows.length > 10){
                table.deleteRow(-1);
            } 

        }
        else{
            //console.log("We ain't got it!");
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = last_prediction;
            cell2.innerHTML = current_input.slice(-1);
            cell3.innerHTML = "Prediction wrong";
            if (table.rows.length > 10){
                table.deleteRow(-1);
            } 
        }

        //Predict. Have we seen this combination before?

        var block_size = 5;
        var last_five_letters = user_buffer.slice(-block_size);
        //console.log("Last five letters:");
        //console.log(last_five_letters);
        var position = user_buffer.slice(0, -block_size).lastIndexOf(last_five_letters);

        if (position > 0){
            //Yay, position!
            last_prediction = user_buffer[position+block_size];
            //console.log("Yay! We found these at index");
            //console.log(position);
            //console.log("Now, we read the next one");
            //console.log(last_prediction);
        }
        else{
            console.log("Position error!");
        }
        compute_average();
        
    }

    }
    else{
        console.log("Length < 170!");
        var current_input = inputElement.value;
        if ((current_input.slice(-1) == "d") || (current_input.slice(-1) == "f")){
            user_buffer = user_buffer + current_input.slice(-1);
        }

        document.getElementById("percentage").innerHTML = "Keep typing to see statistics ("+user_buffer.length+"/170)";
    }
    

  }

