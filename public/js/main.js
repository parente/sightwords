/* jshint browser: true, devel: true */
/* global $ */
$(function() {
    var state = null;
    var puzzle_group;
    var target;
    var $image = $('#image');
    var $text = $('#text');
    var $audio = $('#audio');

    var on_keyup = function(event) {
        if(!target) return;
        var curr = target[0];
        if(!curr || state !== 'puzzle') return;
        var c = String.fromCharCode(event.keyCode).toLocaleLowerCase();
        if(c === curr.c) {
            var last = target.shift();
            complete_char(last);
            if(target.length) {
                curr = target[0];
                if(last.wn !== target[0].wn) {
                    complete_word(last);
                    target_word(curr);
                }
                target_char(curr);
            } else {
                complete_word(last);
                state = 'award';
                step();
            }
        }
    };

    var complete_char = function(target) {
        var i = target.cn;
        $('#char_'+i).removeClass('target').addClass('complete');
            // .parent().removeClass('target').addClass('complete');
    };

    var target_char = function(target) {
        var i = target.cn;
        $('#char_'+i).addClass('target');
        // parent().addClass('target');
    };

    var complete_word = function(target) {
        var i = target.wn;
        $('#word_'+i).removeClass('target').addClass('complete');
    };

    var target_word = function(target) {
        var i = target.wn;
        $('#word_'+i).addClass('target animated pulse');
    };

    var get_puzzle_group = function() {
        $.get('/puzzles/random').done(function(res) {
            state = 'puzzle';
            puzzle_group = res;
            step();
        }).fail(function(err) {
            console.error(err);
        });
    };

    var render_puzzle = function() {
        var puzzle = puzzle_group.puzzles.shift();

        // no puzzles left, next step
        if(!puzzle) {
            state = null;
            step();
            return;
        }

        // parse text into html and target list
        var html = '';
        var word_n = 0;
        target = [];
        var match;
        var last_start = 0;
        var text = puzzle.text;
        var rex = new RegExp('\\b'+puzzle_group.word+'\\b', 'gi');
        while((match = rex.exec(text)) !== null) {
            html += text.substring(last_start, match.index);
            html += '<span class="keyword" id="word_'+word_n+'">';
            for(var i=0, l=match[0].length; i<l; i++) {
                var o = i + match.index;
                var c = match[0][i];
                html += '<span class="char" id="char_'+o+'">'+c+'</span>';
                target.push({cn: o, c: c.toLocaleLowerCase(), wn: word_n});
            }
            html += '</span>';
            last_start = rex.lastIndex;
            ++word_n;
        }
        html += text.substr(last_start);

        // show information
        $image.attr('src', puzzle.image);
        $audio.attr('src', puzzle.audio);
        $audio.get(0).play();
        $text.html(html);

        // set initial target
        target_char(target[0]);
        target_word(target[0]);
    };

    var render_award = function() {
        setTimeout(function() {
            state = 'puzzle';
            step();
        }, 500);
    };

    var step = function() {
        console.log('step', state);
        if(state === null) {
            get_puzzle_group();
        } else if(state === 'puzzle') {
            render_puzzle();
        } else if(state === 'award') {
            render_award();
        }
    };

    // init
    $('body').on('keyup', on_keyup);
    step();
});