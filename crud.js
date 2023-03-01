var count = 0;

function send() {
    var info = document.querySelector('div#info');
    var item = document.getElementById('text');
    var newItem = document.createElement('p');
    var del = document.createElement('input');

    count++

    newItem.id = count;
    newItem.innerHTML = `${item.value}`;
    newItem.value = `${item.value}`; // to transform newItem from undefined to have the same value has what the user have writed

    if (item.value.length == 0) {
        window.alert("please type something in the input");
    } // to send an alert and not allow when the user is trying to send a task blank
    else {
        // to make the task editable when the user clicks it  2 times
        info.addEventListener("click", (edit) => {
            newItem.setAttribute('contenteditable', 'true');

            // to make a task uneditable when the user clicks in a place different than it
            newItem.addEventListener('focusout', (edit) => {
                newItem.setAttribute('contenteditable', 'false');

                                
                var isAlphanumeric = /^[a-zA-Z0-9]+$/.test(newItem.innerText); // to use regex to check if the p (aka newItem) from task is empty

                if (isAlphanumeric == false) {
                    task.remove();
                } // to delete the task in case the user starts to edit but in the end doesn't type a thing
            });

            newItem.addEventListener("keypress", (e) => {
                // to make a task uneditable when the user press enter after editing it
                if (e.code === "Enter") {
                    newItem.setAttribute('contenteditable', 'false');
                }
            });
        });

        var task = document.createElement('div');
        task.id = 'task' + count; // to name the id by the number of tasks already created

        // creating classes to style task and newItem
        task.classList.add('task');
        newItem.classList.add('newItem');

        document.getElementById("info").appendChild(task); // to put tasks inside the div info

        task.appendChild(newItem); // to put newItem (p) inside the "group" task (that is composed by delete button and p aka newItem itself)

        // to create a button to delete
        del.type = 'button';
        del.id = 'del';
        del.value = 'delete';

        // function to delete a task
        del.onclick = (del) => {
            task.remove();
        }

        task.appendChild(del);

        item.value = ''; // cleanning the input after send function (creating a task)
    }
}

// function to allow the user to send a task that was typed by pressing the "enter" key
text.addEventListener("keydown", (e) => {
    e.code === "Enter" ? send() : undefined;
});