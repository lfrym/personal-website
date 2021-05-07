<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();


    let i = 0;
    let typedText = '';
    export let txt = 'No text has been input yet...';
    export let speed = 30;
    export let waitTime = 750;
    export let whichLine;
    function typeWriter(){
        if (i < txt.length) {
            typedText += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
        else {
            setTimeout(doneTyping, waitTime);
        }
	}

    function doneTyping(){
        dispatch('doneTyping',{
        line:whichLine
        });
    }
    
    typeWriter();
    

</script>

<p>{typedText}</p>

<style>
    p {
        color: white;
    }
</style>
