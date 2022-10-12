/**
 * 1. render songs
 * 2. scroll top
 * 3. play/pause/seek
 * 4. cd rotate
 * 5. next/prev
 * 6. random
 * 7. next/repeat when ended
 * 8. active song
 * 9. scroll active song into view
 * 10. play song when click
 */

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'CHILL_PLAYER'
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom : false,
    isRepeat : false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: '3107',
            singer: 'Wn_Duongg_Nâu',
            path: './assets/music/3107.mp3',
            image: './assets/img/3107.jpg'
        },
        {
            name: '3107 2',
            singer: 'Wn_Duongg_Nâu',
            path: './assets/music/3107-2.mp3',
            image: './assets/img/3107.jpg'
        },
        {
            name: '3107 3',
            singer: 'Wn_Duongg_Nâu',
            path: './assets/music/3107-3.mp3',
            image: './assets/img/3107.jpg'
        },
        {
            name: 'Ánh chiều tàn',
            singer: 'D Empty_Poll',
            path: './assets/music/anhchieutan.mp3',
            image: './assets/img/anhchieutan.jpg'
        },
        {
            name: 'Cần 1 ai đó',
            singer: 'Phạm Đình Thái Ngân',
            path: './assets/music/can1aido.mp3',
            image: './assets/img/can1aido.jpg'
        },
        {
            name: 'Ghé qua',
            singer: 'Dick_Tofu_Pc',
            path: './assets/music/ghequa.mp3',
            image: './assets/img/ghequa.jpg'
        },
        {
            name: 'Kẻ theo đuổi ánh sáng',
            singer: 'Huy Vạc',
            path: './assets/music/ketheoduoianhsang.mp3',
            image: './assets/img/ketheoduoianhsang.jfif'
        },
        {
            name: 'Đừng khóc 1 mình',
            singer: 'Quang Hùng Masterd',
            path: './assets/music/dungkhoc1minh.mp3',
            image: './assets/img/dungkhoc1minh.jpg'
        },
        {
            name: 'Nếu ngày ấy',
            singer: 'Soobin Hoàng Sơn',
            path: './assets/music/neungayay.mp3',
            image: './assets/img/neungayay.jfif'
        },
        {
            name: 'Tháng năm',
            singer: 'Soobin Hoàng Sơn',
            path: './assets/music/thang5.mp3',
            image: './assets/img/thang5.jpg'
        },
        {
            name: 'Về bên anh',
            singer: 'Jack',
            path: './assets/music/vebenanh.mp3',
            image: './assets/img/vebenanh.jpg'
        },
        {
            name: 'Người cũ còn thương',
            singer: 'Đức anh',
            path: './assets/music/nguoicuconthuong.mp3',
            image: './assets/img/nguoicuconthuong.jpg'
        },
        {
            name: 'Tệ thật, anh nhớ em',
            singer: 'Thanh Hưng',
            path: './assets/music/tethatanhnhoem.mp3',
            image: './assets/img/tethatanhnhoem.jpg'
        },
        {
            name: 'Sắp 30',
            singer: 'Trịnh Đình Quang',
            path: './assets/music/sap30.mp3',
            image: './assets/img/sap30.jpg'
        },
        {
            name: 'Xin đừng lặng im',
            singer: 'Soobin Hoàng Sơn',
            path: './assets/music/xindunglangim.mp3',
            image: './assets/img/xindunglangim.jpg'
        }
    ],

    setConfig: function(key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },

    render: function(){
        const htmls = this.songs.map((song,index) => {
            return `            
            <div class="song ${index === this.currentIndex ? 'active' : ''}"data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h option-icon"></i>
                </div>
            </div>`
        })
        playlist.innerHTML = htmls.join('')
    },

    // getCurrentSong: function(){
    //     return this.songs[this.currentIndex]
    // },

    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function(){
        const _this = this
        const cdWidth = cd.offsetWidth

        // xu ly cd quay, dung
        const cdThumbAnimate = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 7777,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // xu ly thu phong cd
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth/cdWidth
        }

        // xu ly khi play/pause
        playBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause()
            }
            else{
                audio.play()
            }
            
            // khi duoc play
            audio.onplay = function(){
                _this.isPlaying = true
                player.classList.add('playing')
                cdThumbAnimate.play()
            }
            
            // khi duoc pause
            audio.onpause = function(){
                _this.isPlaying = false
                player.classList.remove('playing')
                cdThumbAnimate.pause()
            }

            // khi process bai hat thay doi
            audio.ontimeupdate = function(){
                if(audio.duration){
                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                    progress.value = progressPercent
                }
            }

            // xu ly khi tua bai hat
            progress.onchange = function(e){
                const seekTime = audio.duration / 100 * e.target.value
                audio.currentTime = seekTime
            }

            // khi next
            nextBtn.onclick = function(){
                if(_this.isRandom){
                    _this.randomSong()
                }
                else{
                    _this.nextSong()
                }
                audio.play()
                _this.render()
                _this.scrollToActiveSong()
            }

            // khi previous
            prevBtn.onclick = function(){
                if(_this.isRandom){
                    _this.randomSong()
                }
                else{
                    _this.prevSong()
                }
                audio.play()
                _this.render()
            }

            // xu ly bat tat random song
            randomBtn.onclick = function(){
                _this.isRandom = !_this.isRandom
                _this.setConfig('isRandom', _this.isRandom)
                randomBtn.classList.toggle('active', _this.isRandom)
            }

            // xu ly song repeat
            repeatBtn.onclick = function(){
                _this.isRepeat = !_this.isRepeat
                _this.setConfig('isRepeat', _this.isRepeat)
                repeatBtn.classList.toggle('active', _this.isRepeat)
            }

            // xu ly next song khi ended
            audio.onended = function(){
                if(_this.isRepeat){
                    audio.play()
                }
                else{
                    nextBtn.click()
                }
            }

            // lang nghe click vao playlist
            playlist.onclick = function(e){
                const songNode = e.target.closest('.song:not(.active)')
                const songOption = e.target.closest('.option')

                // xu ly khi click vao song
                if(songNode || songOption){
                    // xu ly khi click vao song
                    if(songNode){
                        // console.log(songNode.getAttribute('data-index'))
                        // console.log(songNode.dataset.index)
                        _this.currentIndex = Number(songNode.dataset.index)
                        _this.loadCurrentSong()
                        audio.play()
                        _this.render()

                    }

                    // xu ly khi click vao option
                    if(e.target.closest('.option')){

                    }
                }
            }
        }
    },
    
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    
    loadconfig: function(){
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        }
        this.loadCurrentSong()
    },

    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    randomSong: function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        }
        while(newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    scrollToActiveSong: function(){
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            }, 300)
        })
    },

    start: function(){
        // gan cau hinh tu config vao app
        this.loadconfig()

        // dinh nghia cac thuoc tinh cho object
        this.defineProperties()

        // lang nghe, xu ly ca su kien DOM event
        this.handleEvents()

        // tai thong tin bai hat dau tien vao ui khi chay app
        this.loadCurrentSong()

        // render playlist
        this.render()

        // hien thi trang thai ban dau cua btn repeat, random
        repeatBtn.classList.toggle('active', _this.isRepeat)
        randomBtn.classList.toggle('active', _this.isRandom)
    }
}

app.start()