const discord = require('discord.js')
const config = require("./config.json")
const client = new discord.Client()
const prefix = config.prefix
const sanjesh = config.sanjesh
const randomMessages = [
   'گردش روزگار به کام تو است و اگر دچار مختصر رنج و غمی شدی، نگران نباش. خونسرد باش و حوصله کن. با همه ی مردم مدارا کن و مغرور نباش. خداوند را شکرگزار باش و قدر نعمات او را بدان و به دیگران محبت کن',
   'افسوس خوردن برای آنچه که از دست داده ای نتیجه ای جز نا امیدی و یأس ندارد. برای جبران مافات، دوباره سعی کن و راه های گوناگون را آزمایش نما. کارها را سخت نگیر زیرا در این صورت به جایی نخواهی رسید',
   'در برابر سختی ها و مشکلات با ثبات و مقاوم هستی و این بسیار خوب است. اما دقت کن که به نا امیدی و یأس دچار نشوی. با دوستان مشورت کن و از آنها کمک بطلب و لجبازی نکن. در کارها به خدا توکل داشته باش.',
   'به آنچه می خواهی نرسیده ای و غم و اندوهی سراسر زندگیت را فرا گرفته اما روزگار هرگز به یک روش نمی چرخد و پایان هر شب سیاهی سپیدی روز است. شاد باش و غم دنیا را نادیده بگیر.',
   'ریا و دروغ را رها کن تا اعتماد مردم را جلب کنی. صداقت و درستی را پیشه ی خود ساز تا بهتر به هدف خود دست یابی. دوستان و ناصحان خیراندیش را از خود نرنجان زیرا در هر کار به کمک فکری دیگران احتیاج پیدا می کنی.',
   'ریا و دروغ را رها کن تا اعتماد مردم را جلب کنی. صداقت و درستی را پیشه ی خود ساز تا بهتر به هدف خود دست یابی. دوستان و ناصحان خیراندیش را از خود نرنجان زیرا در هر کار به کمک فکری دیگران احتیاج پیدا می کنی.',
   'هر کسی نمی تواند پی به حقیقت ببرد. لازمه ی آن امید به خداوند و دوری از ریا و تزویر است. عقل و تدبیر در کنار ایمان، رمز موفقیت است.',
   'از دوری عزیزی در رنج و عذابی و آرزوی دیدن او را داری. صبر کن تا دوره ی هجران به سر آید. ارتباط خود را با او قطع نکن. مال و سرمایه ای را از دست داده ای. دوباره با کمی صبر آن را بدست خواهی آورد.',
   'راه پر خطر عشق را طی کردن کار هر کس نیست. مردی با اراده و قوی می خواهد تا از سختی های راه نهراسد. برای رسیدن به مقصود باید تلاش کرده و مأیوس نشوی.',
   'کاری که شروع کرده ای نیمه تمام رها نکن و از ناملایمات زندگی نا امید و مأیوس نباش. به کار خود با دقت و تعمق بیشتر نگاه کن تا نقطه ضعف های خود را پیدا کنی. اگر به مقصود خود هم نرسیدی ناراحت نشو. زندگی فراز و نشیب بسیار دارد. به خداوند توکل کن.',
   'در راه رسیدن به مقصود، شجاع و صادق باش. تزویر و ریا را از خود دور کن زیرا به نتیجه ای نخواهی رسید. شک و تردید در این کار جایز نیست زیرا عاقبت به مقصود خود خواهی رسید.',
   'خودپسندی و تکبر را از خود دور کن. آنچه باعث شکست و ناکامی تو می شود بی فکری و غرور است. از افکار بیهوده دست بردار. به آنچه قسمت و نصیب تو است راضی باش و به آنچه که داری قناعت کن. اگر واقع بین و دقیق باشی به آرزوهای خود می رسی.',
   'با همه ی سعی و کوشش به مقصود خود نرسیده ای اما نا امید نباش. با تعمق در گذشته و پیدا کردن نقطه ی ضعف خود می توانی به جبران مافات بپردازی. مشکلی نیست که آسان نشود.',
   'احساس می کنی از هدف و مقصود خود دور شده ای و یا عزیزی نسبت به تو کم توجهی می کند. انتظار و امیدواری، مقصود تو را حاصل می کند. نگرانی را از خود دور کن.',
   'به زودی شاهد مقصود را در بر خواهی گرفت و به مراد خود خواهی رسید. در امر ازدواج بسیار موفق خواهی شد. یار و همسر مناسب و دلخواهی خواهی گرفت. کاری را که در پیش گرفته ای رها نکن و به سرانجام برسان.',
   'توقعات بی جا و آرزوهای دست نیافتنی را از سر خود بیرون کن و عاقلانه بیندیش. در زندگی میانه رو باش تا دچار مشکل و سختی نشوی. شجاع باش و از ناملایمات زندگی، خود را نباز.',
   'لحظات گرانبهای عمر را بیهوده به هدر نده. عاقلانه به خود و اهدافت بیندیش و از مشورت با دیگران خودداری نکن. غفلت و بی فکری، تو را از رسیدن به مقصود دور می کند. از مشکلات و ناملایمات راه گلایه نکن. اگر نقشه ای درست و بر اساس عقل و تدبر داشته باشی، هیچ چیز مانع تو نخواهد شد. در انتخاب دوستان و همنشینان، دقت بیشتری کن.',
   'راه رسیدن به هدف دور و دراز است و اراده ای محکم می خواهد. دست از سعی و تلاش بر ندار و نا امیدی را به خود راه نده. دعا به درگاه خدا را فراموش نکن تا آرامش روانی داشته باشی. به کمک دوستان خود امیدوار باش.',
   'با تمام وجود عاشق شده ای و از غم دوری در رنج و عذاب به سر می بری. نا امید و مأیوس نباش. صبر و حوصله داشته باش تا به مقصود خود برسی.',
   'بخت و اقبال مساعد همراه تو است. به زودی به کام و آرزوی خود می رسی. با کمی تلاش می توانی آرزوهای خود را تحقق بخشی. در روزگار خوشی و سرور، خودبین و خودپسند نباش و به دیگران نیز بیندیش. خداوند را شاکر و سپاسگزار باش و قدر نعمت های او را بدان.',
   'موقعیت را غنیمت بدان و از آن استفاده کن. رنج و مصیبت، عاقبت به خوشی خواهد انجامید. نا امیدی را از خود دور کن تا به مقصود برسی.',
   'زندگی خوب و سعادتمندی در پیش داری. مغرور و متکبر نباش و با دوستان و اطرافیان با مهربانی رفتار کن. در زمان بی نیازی و توانایی، نیازمندان و کسانی را که به کمک تو امید دارند فراموش نکن.',
   'دودلی و تردید را از خود دور کن. از همنشینان و دوستان بد دوری کن تا دچار رنج و گمراهی نشوی. آرزوهای دور و دست نیافتنی غیر از رنج و زحمت نتیجه ای ندارد. اعتدال و میانه روی را پیشه کن.',
   'به زودی نتیجه ی صبر و استقامت و تحمل رنجها را خواهی دید و مزد آن را خواهی گرفت. روزگار روی خوش خود را به تو نشان خواهد داد. به مقصود خود خواهی رسید.',
   'هدف و مقصدی که در پیش داری بسیار خوب است. از طعنه ی حسودان و دشمنان نترس. با جلب محبت دیگران می توانی از کمک آنها استفاده کنی. دوستان صادق خود را رها نکن.',
   'دوستان خود را فراموش نکن. از عیب جویی بی خردان بیمی به دل راه نده. در امر ازدواج موفق و سعادتمند خواهی شد.',
   'اگر بدون فکر و اندیشه به کاری که داری ادامه بدهی، نتیجه ای جز شکست نخواهی برد. گمان نکن که راه رسیدن به مقصود دشوار است. هیچ مشکلی وجود ندارد که آسان نشود. عقل و اندیشه را راهنمای خود قرار ده.',
   'از افراد متملق و چاپلوس دوری کن که به تو حسادت می ورزند. از ریا و تظاهر دوری کن و به خدا روی بیاور زیرا امنیت و آسایش در دوری از ریاکاران است.',
   'نا امیدی را از خود دور کن. شک و تردید را از خود بران و اراده ی خود را قوی کن تا بتوانی بهتر تصمیم بگیری. بدون رنج و زحمت، هیچ چیزی به آسانی به دست نمی آید.',
   'از شخصی توقع کمک و یاری داری اما برای رسیدن به هدف باید به خود متکی باشی و به خاطر رسیدن به مقصود شخصیت و عزت نفس را پایمال نکنی. نسبت به دیگران بی اعتنا نباش و در رفع مشکلات آنها بکوش.',
   'زندگی راحت و آسوده ای در پیش رو داری. خداوند را سپاسگزار باش تا نعمت و آرامش در زندگیت همیشگی و مداوم باشد.',
   'اگر قرار بود هر کسی به سادگی به مقصود برسد، دنیا گلستان می شد. هر شکست مقدمه ی پیروزی است. اظهار عجز و ناتوانی را رها کن و دوباره به سعی و تلاش بپرداز تا به موفقیت برسی.',
   'از هر راهی برای رسیدن به مقصد تلاش کن و از دوستان خوب خود یاری بخواه و به فکر دیگران هم باش و در صورت مقتضی به دوستان خود کمک کن',
   'در انتظار به سر می بری. نا امید و ناراحت نباش زیرا به مقصود خود می رسی. بلا و مصیبت های رسیده را تحمل کن. در کوره ی حوادث، خود را آبدیده کن و تجربه اندوزی کن تا لذت بیشتری از پیروزی ببری.',
   'اگر به آنچه داری قانع باشی، هرگز غمگین و ناراحت نخواهی شد. به خداوند توکل کن و به خاطر منافع زودگذر دنیا، خود را به زحمت مینداز. بدون رنج و زحمت به جایی نخواهی رسید بنابراین بر اساس توانایی و قدرت خود زندگی کن. با تنبلی و سهل انگاری، انسان به جایی نمی رسد. پس اول باید مستعد و آماده باشی و سپس شروع به کار کنی.',
   'از زندگی خود بهره ی لازم را بگیر. بیهوده خود را به خاطر مال و ثروت دنیا و افکار پوچ، دچار رنج و زحمت نکن. فرصتها را غنیمت بدان و آنها را بیهوده از دست نده. زندگی دارای نشیب و فراز بسیار است. اگر امروز به کام تو است فردا ممکن است با ندانم کاری ها دچار رنج و مصیبت شوی.',
   'در راه دوستی و عشق، شک و تردید به خود راه نده. دوستان مشفق را از خود نرنجان. بر گذشته حسرت نخور و به آینده فکر کن تا آن را بهتر و مطابق میل خود بسازی.',
   'اگر می خواهی به هدفت برسی، از ملامت و سرزنش دیگران بیمی به دل راه نده. اگر برای مقصود خود ارزش قائل هستی، دست از سعی و تلاش بر ندار. دقت و تعمق بیشتری داشته باش. بیهوده ناامید و مأیوس نباش و با اندک ناملایمتی هراسان نشو.'
  ]
  const ghazals = [
    'اگر آن تُرک شیرازی به دست آرد دل ما را  به خال هِندویَش بخشم سمرقند و بخارا را',
    'بده ساقی مِیِ باقی که در جنت نخواهی یافت کنار آب رُکن آباد و گُلگَشت مُصَلّا را',
    'فَغان کاین لولیانِ شوخِ شیرین‌کار شهرآشوب چنان بردند صبر از دل که تُرکان خوان یغما را',
    'ز عشق ناتمام ما جمال یار مُستَغنی است به آب و رنگ و خال و خط چه حاجت روی زیبا را؟',
    'من از آن حسن روزافزون که یوسف داشت دانستم که عشق از پردهٔ عصمت برون آرد زلیخا را',
    'گر دشنام فرمایی و گر نفرین، دعا گویم جواب تلخ می‌زیبد، لب لعل شکرخا را',
    'نصیحت گوش کن جانا که از جان دوست‌تر دارند جوانان سعادتمند پند پیر دانا را',
    'حدیث از مطرب و مِی گو و راز دَهر کمتر جو که کس نگشود و نگشاید به حکمت این معما را',
    'زلف‌آشفته و خِوی‌کرده و خندان‌لب و مست پیرهن‌چاک و غزل‌خوان و صُراحی در دست  ',
    'نرگسش عربده‌جوی و لبش افسوس‌کنان نیم شب دوش به بالین من آمد بنشست',
    'ز ديده خون دل همه بر روی ما رود — بر روی ما ز ديده چه گويم چه‌ها رود',
    'ما در درون سينه هوايی نهفته‌ايم — بر باد اگر رود دل ما زان هوا رود',
    'خورشيد خاوری کند از رشک جامه چاک — گر ماه مهرپرور من در قبا رود',
    'بر خاک راه يار نهاديم روی خويش — بر روی ما رواست اگر آشنا رود',
    'سيل است آب ديده و هر کس که بگذرد — گر خود دلش ز سنگ بود هم ز جا رود',
    'ما را به آب ديده شب و روز ماجراست — زان رهگذر که بر سر کويش چرا رود',
    'رو بر رهش نهادم و بر من گذر نکرد — صد لطف چشم داشتم و يک نظر نکرد',
    'سيل سرشک ما ز دلش کين به درنبرد — در سنگ خاره قطره باران اثر نکرد',
    'يا رب تو آن جوان دلاور نگاه دار — کز تير آه گوشه نشينان حذر نکرد',
    'ماهی و مرغ دوش ز افغان من نخفت — وان شوخ ديده بين که سر از خواب برنکرد',
    'می‌خواستم که ميرمش اندر قدم چو شمع — او خود گذر به ما چو نسيم سحر نکرد',
    'جانا کدام سنگ‌دل بی‌کفايتيست — کو پيش زخم تيغ تو جان را سپر نکرد',
    'تا سر زلف تو در دست نسيم افتادست — دل سودازده از غصه دو نيم افتادست',
    'چشم جادوی تو خود عين سواد سحر است — ليکن اين هست که اين نسخه سقيم افتادست',
    'در خم زلف تو آن خال سيه دانی چيست — نقطه دوده که در حلقه جيم افتادست',
    'زلف مشکين تو در گلشن فردوس عذار — چيست طاووس که در باغ نعيم افتادست',
    'دل من در هوس روی تو ای مونس جان — خاک راهيست که در دست نسيم افتادست',
    'همچو گرد اين تن خاکی نتواند برخاست — از سر کوی تو زان رو که عظيم افتادست',
    'ای پادشه خوبان داد از غم تنهايی — دل بی تو به جان آمد وقت است که بازآيی',
    'دايم گل اين بستان شاداب نمی‌ماند — درياب ضعيفان را در وقت توانايی',
    'ديشب گله زلفش با باد همی‌کردم — گفتا غلطی بگذر زين فکرت سودايی',
    'صد باد صبا اين جا با سلسله می‌رقصند — اين است حريف ای دل تا باد نپيمايی',
    'مشتاقی و مهجوری دور از تو چنانم کرد — کز دست بخواهد شد پاياب شکيبايی',
    'يا رب به که شايد گفت اين نکته که در عالم — رخساره به کس ننمود آن شاهد هرجايی'
  ];

const give = config.give

client.on('ready', () => {
    console.log(`ready! ${client.user.tag}`)
    client.user.setActivity(`${prefix}help`, { type: "PLAYING" })
})
client.on('message', message => {
    if (message.author.bot || message.channel.type === "dm") return;
    const cmd = message.content.toLocaleLowerCase()
    const messageArray = cmd.split(" ")
    const command = messageArray[0]
    if(command == `${prefix}serverinfo`){
        let serverEmbed = new discord.MessageEmbed()
        serverEmbed.setColor("#blce23")
        serverEmbed.setAuthor(client.user.username, client.user.displayAvatarURL())
        serverEmbed.setTitle("Server Info")
        serverEmbed.setURL("https://discord.com/")
        serverEmbed.setDescription("your server info")
        serverEmbed.setThumbnail(message.guild.iconURL())
        serverEmbed.addField("Server name", message.guild.name)
        serverEmbed.addField("Server Owner", message.guild.owner)
        serverEmbed.addField("Member Count", message.guild.memberCount)
        serverEmbed.addField("Role Count", message.guild.roles.cache.size)
        serverEmbed.addField("Emoji Count", message.guild.emojis.size)
        serverEmbed.addField("ID Server", message.guild.id)
        serverEmbed.setTimestamp()
        serverEmbed.setImage(client.user.displayAvatarURL())
        serverEmbed.setFooter(`Requested By ${message.author.username}`, message.author.displayAvatarURL())
        message.channel.send(serverEmbed)
    }
    if(command == `${prefix}cyrusthegreat`) {
        let CTGEmbed = new discord.MessageEmbed()
        CTGEmbed.setColor("#blce23")
        CTGEmbed.setTitle("Cyrus The Great")
        CTGEmbed.setURL("https://fa.wikipedia.org/wiki/%DA%A9%D9%88%D8%B1%D9%88%D8%B4_%D8%A8%D8%B2%D8%B1%DA%AF")
        CTGEmbed.setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLPiZwmUl9hDe5UGRwr-q1npLvbaAsPdPgwg&usqp=CAU")
        message.channel.send(CTGEmbed)
    }
    if(command == `${prefix}achaemenid`) {
        let achaemenid = new discord.MessageEmbed()
        achaemenid.setTitle("View More")
        achaemenid.setURL("https://en.wikipedia.org/wiki/Achaemenid_Empire")
        achaemenid.setImage("https://cdn.discordapp.com/attachments/1066875673798524998/1080489241320116324/1431920_316.jpg")
        achaemenid.setDescription("The Achaemenid Empire or Achaemenian Empire[16] (/əˈkiːmənɪd/; Old Persian: 𐎧𐏁𐏂, Xšāça, lit. 'The Empire'[17] or 'The Kingdom'[18]), was the ancient Iranian empire founded by Cyrus the Great in 550 BC; the First Persian Empire.[19] Based in Western Asia, it was the largest empire the world had ever seen at its time, spanning a total of 5.5 million square kilometres (2.1 million square miles) from the Balkans and Egypt in the west to Central Asia and the Indus Valley in the east.[12][13]")
        message.channel.send(achaemenid)
    }
    if(command == `${prefix}avatar`){
        let avatar = new discord.MessageEmbed()
        avatar.setAuthor(`avatar of ${message.author.tag}`)
        avatar.setImage(message.author.displayAvatarURL())
        message.channel.send(avatar)
    }
   
    if(command == `${prefix}sasanian`) {
        let sEmpire = new discord.MessageEmbed()
        sEmpire.setTitle("View More")
        sEmpire.setURL("https://en.wikipedia.org/wiki/Sasanian_Empire")
        sEmpire.setImage("https://cdn.discordapp.com/attachments/1025709176929931348/1080524708308602911/images_23.jpg")
        sEmpire.setDescription("The Sasanian (/səˈsɑːniən, səˈseɪniən/) or Sassanid Empire, officially known as the Empire of Iranians (Middle Persian: 𐭠𐭩𐭥𐭠𐭭𐭱𐭲𐭥𐭩, Ērānšahr)[a] and also referred to by historians as the Neo-Persian Empire,[9] was the last Iranian empire before the early Muslim conquests of the 7th-8th centuries AD. Named after the House of Sasan, it endured for over four centuries, from 224 to 651 AD, making it the longest-lived Persian imperial dynasty.[2][10] The Sasanian Empire succeeded the Parthian Empire, and re-established the Persians as a major power in late antiquity alongside its neighbouring arch-rival, the Roman Empire (after 395 the Byzantine Empire).[11][12][13]")
        message.channel.send(sEmpire)
    }
    if(command == `${prefix}samanian`){
        let SMEmpire = new discord.MessageEmbed()
        SMEmpire.setTitle("View More")
        SMEmpire.setImage("https://cdn.discordapp.com/attachments/1079453870025080935/1080807147601924126/300px-13_Buhara_Mavzolej_Ismaila_Samanija_2.jpg")
        SMEmpire.setURL("https://en.wikipedia.org/wiki/Samanid_Empire")
        SMEmpire.setDescription("The Samanid Empire (Persian: سامانیان, romanized: Sāmāniyān) also known as the Samanian Empire, Samanid dynasty, Samanid amirate, or simply as the Samanids) was a Persianate Sunni Muslim empire, of Iranian dehqan origin. The empire was centred in Khorasan and Transoxiana; at its greatest extent encompassing Persia and Central Asia, from 819 to 999.")
        message.channel.send(SMEmpire)
    }
    if(command == `${prefix}safavid`){
        let safavid = new discord.MessageEmbed
        safavid.setTitle("View More")
        safavid.setURL("https://en.wikipedia.org/wiki/Safavid_Iran")
        safavid.setImage("https://cdn.discordapp.com/attachments/1025709176929931348/1080524683616722954/Masjed-e-Emam-Esfahan-Iran.jpg")
        safavid.setDescription("Safavid Iran or Safavid Persia (/ˈsæfəvɪd, ˈsɑː-/), also referred to as the Safavid Empire,[c] was one of the greatest Iranian empires after the 7th-century Muslim conquest of Persia, which was ruled from 1501 to 1736 by the Safavid dynasty.[25][26][27][28] It is often considered the beginning of modern Iranian history,[29] as well as one of the gunpowder empires.[30] The Safavid Shāh Ismā'īl I established the Twelver denomination of Shīʿa Islam as the official religion of the empire, marking one of the most important turning points in the history of Islam.[31]")
        message.channel.send(safavid)
    }
    if(command == `${prefix}saffarid`) {
        let saff = new discord.MessageEmbed()
        saff.setTitle("View More")
        saff.setURL("https://en.wikipedia.org/wiki/Saffarid_dynasty")
        saff.setImage("https://cdn.discordapp.com/attachments/1025709176929931348/1080524620765077535/images_26.jpg")
        saff.setDescription("The Saffarid dynasty (Persian: صفاریان, romanized: safaryan) was a Persianate dynasty of eastern Iranian origin that ruled over parts of Persia, Greater Khorasan, and eastern Makran from 861 to 1003. One of the first indigenous Persian dynasties to emerge after the Islamic conquest, the Saffarid dynasty was part of the Iranian Intermezzo. The dynasty's founder was Ya'qub bin Laith as-Saffar, who was born in 840 in a small town called Karnin (Qarnin), which was located east of Zaranj and west of Bost, in what is now Afghanistan. A native of Sistan and a local ayyār, Ya'qub worked as a coppersmith (ṣaffār) before becoming a warlord. He seized control of the Sistan region and began conquering most of Iran and Afghanistan, as well as parts of Pakistan, Tajikistan and Uzbekistan.")
        message.channel.send(saff)
    }
    if(command == `${prefix}qajar`) {
        let qajar = new discord.MessageEmbed()
        qajar.setTitle("View More")
        qajar.setURL("https://en.wikipedia.org/wiki/Qajar_dynasty")
        qajar.setImage("https://cdn.discordapp.com/attachments/1066875673798524998/1080489296101904434/jpg.jpg")
        qajar.setDescription("The Qajar dynasty (listen (help·info); Persian: دودمان قاجار Dudmân-e Qâjâr, Azerbaijani: Qacarlar قاجارلار)[a] was an Iranian[1] royal dynasty of Turkic origin,[2][3][4][5] specifically from the Qajar tribe, ruling over Iran from 1789 to 1925.[6][7] The Qajar family took full control of Iran in 1794, deposing Lotf 'Ali Khan, the last Shah of the Zand dynasty, and re-asserted Iranian sovereignty over large parts of the Caucasus. In 1796,")
        message.channel.send(qajar)
     }
    if(command ==  `${prefix}zand`) {
        let zand = new discord.MessageEmbed()
        zand.setTitle("View More")
        zand.setURL("https://en.wikipedia.org/wiki/Zand_dynasty")
        zand.setImage("https://cdn.discordapp.com/attachments/1025709176929931348/1080524696489037865/download_25.jpg")
        zand.setDescription("The Zand dynasty (Persian: دودمان زندیان, Dudmane Zandiyan) was an Iranian dynasty,[1] founded by Karim Khan Zand (r. 1751–1779) that initially ruled southern and central Iran in the 18th century. It later quickly came to expand to include much of the rest of contemporary Iran (except for the provinces of Balochistan and Khorasan) as well as parts of Iraq. The lands of present-day Armenia, Azerbaijan, and Georgia were controlled by khanates which were de jure part of the Zand realm, but the region was de facto autonomous.[2] The island of Bahrain was also held for the Zands by the autonomous Al-Mazkur sheikhdom of Bushire.")
        message.channel.send(zand)
    }
    if(command == `${prefix}pahlavi`) {
        let pahlavi = new discord.MessageEmbed()
        pahlavi.setDescription("The Pahlavi dynasty (Persian: دودمان پهلوی) was the last Iranian royal dynasty, ruling for almost 54 years between 1925 and 1979. The dynasty was founded by Reza Shah Pahlavi, a non-aristocratic Mazanderani soldier[1] in modern times, who took on the name of the Pahlavi language spoken in the pre-Islamic Sasanian Empire in order to strengthen his nationalist credentials.[2][3][4][5]")
        pahlavi.setTitle("View More")
        pahlavi.setURL("https://en.wikipedia.org/wiki/Pahlavi_dynasty")
        pahlavi.setImage("https://cdn.discordapp.com/attachments/1066875673798524998/1080489390394052668/images_22.jpg")
        message.channel.send(pahlavi)
    }
    if(command == `${prefix}parthian`){
        let par = new discord.MessageEmbed()
        par.setTitle("View More")
        par.setURL("https://en.wikipedia.org/wiki/Parthian_Empire")
        par.setImage("https://cdn.discordapp.com/attachments/1079453870025080935/1080807930431025194/images_32.jpg")
        par.setDescription("The Parthian Empire (/ˈpɑːrθiən/), also known as the Arsacid Empire (/ˈɑːrsəsɪd/),[11] was a major Iranian political and cultural power in ancient Iran from 247 BC to 224 AD.[12] Its latter name comes from its founder, Arsaces I,[13] who led the Parni tribe in conquering the region of Parthia[14] in Iran's northeast, then a satrapy (province) under Andragoras, who was rebelling against the Seleucid Empire. Mithridates I (r. c. 171–132 BC) greatly expanded the empire by seizing Media and Mesopotamia from the Seleucids. At its height, the Parthian Empire stretched from the northern reaches of the Euphrates, in what is now central-eastern Turkey, to present-day Afghanistan and western Pakistan. The empire, located on the Silk Road trade route between the Roman Empire in the Mediterranean Basin and the Han dynasty of China, became a center of trade and commerce.")
        message.channel.send(par)
    }
    if(command == `${prefix}afsharid`) {
        let afsharid = new discord.MessageEmbed
        afsharid.setTitle("View More")
        afsharid.setImage("https://cdn.discordapp.com/attachments/1079453870025080935/1080806229682696192/images_30.jpg")
        afsharid.setURL("https://en.wikipedia.org/wiki/Afsharid_Iran")
        afsharid.setDescription("Afsharid Iran (Persian: ایران افشاری), also referred as the Afsharid Empire[7] was an Iranian[8] empire established by the Turkoman[9][10] Afshar tribe in Iran's north-eastern province of Khorasan, ruling Iran (Persia). The state was ruled by the Afsharid dynasty in the mid-eighteenth century. The dynasty was founded in 1736 by the brilliant military[11] commander Nader Shah, who deposed the last member of the Safavid dynasty and proclaimed himself as the Shah of Iran.")
        message.channel.send(afsharid)
    }
    if(command == `${prefix}falhafez`) {
        message.delete()
        const randomIndex = Math.floor(Math.random() * randomMessages.length);
    const randomMessage = randomMessages[randomIndex];
    let mashinEmbed = new discord.MessageEmbed
    mashinEmbed.setAuthor("فال شما این شد", message.author.displayAvatarURL())
    mashinEmbed.setDescription(randomMessage)
    mashinEmbed.setTimestamp()
    mashinEmbed.setImage("https://financialtribune.com/sites/default/files/12_hafez_goethe_2.jpg")
    message.channel.send(`${message.author}`,mashinEmbed);
    }
    if(command == `${prefix}sanjesh`) {
        const min = 1;
        const max = 100;
        const result = Math.floor(Math.random() * (max - min + 1)) + min;
        message.channel.send(`🎲 شما ${result}% اریایی هستید`);
    }
    if(command == `${prefix}khwarazmian`) {
        let Khwarazmian  = new discord.MessageEmbed
        Khwarazmian.setTitle("View More")
        Khwarazmian.setURL("https://en.wikipedia.org/wiki/Khwarazmian_Empire")
        Khwarazmian.setImage("https://cdn.discordapp.com/attachments/1025709176929931348/1080524552670543884/images_28.jpg")
        Khwarazmian.setDescription("The Khwarazmian or Khwarezmian Empire[note 2] (English: /kwəˈræzmiən/)[8] was a culturally Persianate, Sunni Muslim empire of Turkic mamluk origin,[9][10] that ruled large parts of present-day Central Asia, Afghanistan, and Iran in the approximate period of 1077 to 1231, first as vassals of the Seljuk Empire[11] and the Qara Khitai (Western Liao dynasty),[12] and from circa 1190 as independent rulers, up until the Mongol conquest in 1219-1221. The Khwarazmian Empire eventually became the most powerful and aggressively expansionist empire in the Persian lands, defeating the Seljuk Empire and the Ghurid Empire, even threatening the Abbasid caliphate, making it in the beginning of the 13th century the greatest power in the Muslim world.[13] It is estimated that the empire spanned an area of 2.3 million square kilometers[14] to 3.6 million square kilometers[15] effectively making it one of the largest land empires in history. The empire, which was modelled on the preceding Seljuk Empire, was defended by a huge cavalry army composed largely of Kipchak Turks.[16]")
        message.channel.send(Khwarazmian)
    }
    if(command == `${prefix}seljuk`) {
        let sell = new discord.MessageEmbed
        sell.setTitle("View More")
        sell.setURL("https://en.wikipedia.org/wiki/Seljuk_Empire")
        sell.setImage("https://cdn.discordapp.com/attachments/1025709176929931348/1080524542075744306/download_27.jpg")
        sell.setDescription("The Great Seljuk Empire,[13][a] or the Seljuk Empire, was a high medieval, culturally Turco-Persian,[16] Sunni Muslim empire, founded and ruled by the Qïnïq branch of Oghuz Turks.[17] It spanned a total area of 3.9 million square kilometres (1.5 million square miles) from Anatolia and the Levant in the west to the Hindu Kush in the east, and from Central Asia in the north to the Persian Gulf in the south.")
        message.channel.send(sell)
    }
    if(command == `${prefix}ghaznavids`) {
        let bemola = new discord.MessageEmbed
        bemola.setTitle("View More")
        bemola.setURL("https://en.wikipedia.org/wiki/Ghaznavids")
        bemola.setImage("https://cdn.discordapp.com/attachments/1025709176929931348/1080524531065700382/images_29.jpg")
        bemola.setDescription("The Ghaznavid dynasty (Persian: غزنویان Ġaznaviyān) was a culturally Persianate, Sunni Muslim dynasty of Turkic mamluk origin,[b] ruling at its greatest extent, large parts of Persia, Khorasan, much of Transoxiana and the northwest Indian subcontinent from 977 to 1186. The dynasty was founded by Sabuktigin upon his succession to the rule of Ghazna after the death of his father-in-law, Alp Tigin, who was an ex-general of the Samanid Empire from Balkh, north of the Hindu Kush in Greater Khorasan.")
        message.channel.send(bemola)
    }
    if(command ==  `${prefix}parthian`) {
        let  partak =  new discord.MessageEmbed
        partak.setTitle("View More")
        partak.setURL("https://en.wikipedia.org/wiki/Parthian_Empire")
        partak.setImage("https://cdn.discordapp.com/attachments/1025709176929931348/1080524632114876466/images_27.jpg")
        partak.setDescription("The Parthian Empire (/ˈpɑːrθiən/), also known as the Arsacid Empire (/ˈɑːrsəsɪd/),[11] was a major Iranian political and cultural power in ancient Iran from 247 BC to 224 AD.[12] Its latter name comes from its founder, Arsaces I,[13] who led the Parni tribe in conquering the region of Parthia[14] in Iran's northeast, then a satrapy (province) under Andragoras, who was rebelling against the Seleucid Empire. Mithridates I (r. c. 171–132 BC) greatly expanded the empire by seizing Media and Mesopotamia from the Seleucids. At its height, the Parthian Empire stretched from the northern reaches of the Euphrates, in what is now central-eastern Turkey, to present-day Afghanistan and western Pakistan. The empire, located on the Silk Road trade route between the Roman Empire in the Mediterranean Basin and the Han dynasty of China, became a center of trade and commerce.")
        message.channel.send(partak)
    }
    if(command ==  `${prefix}medes`) {
        let medd = new discord.MessageEmbed()
        medd.setTitle("View More")
        medd.setURL("https://en.wikipedia.org/wiki/Medes")
        medd.setImage("https://cdn.discordapp.com/attachments/1079453870025080935/1080805496308637706/download_28.jpg")
        medd.setDescription("The Medes /ˈmiːdz/[N 1] (Old Persian: 𐎶𐎠𐎭 Māda-; Akkadian: Assyrian cuneiform U121B3 MesZL 578.svgAssyrian cuneiform U12220 MesZL 552.svgAssyrian cuneiform U12055 MesZL 561.svgAssyrian cuneiform U12000 MesZL 839.svgAssyrian cuneiform U12000 MesZL 839.svg mat Mādāya, Assyrian cuneiform U121B3 MesZL 578.svgAssyrian cuneiform U12220 MesZL 552.svgAssyrian cuneiform U122EB MesZL 248.svgAssyrian cuneiform U12000 MesZL 839.svgAssyrian cuneiform U12000 MesZL 839.svg mat Mātāya;[2] Ancient Greek: Μῆδοι Mēdoi; Latin: Medi) were an ancient Iranian people[N 2] who spoke the Median language and who inhabited an area known as Media between western and northern Iran. Around the 11th century BC, they occupied the mountainous region of northwestern Iran and the northeastern and eastern region of Mesopotamia located in the region of Hamadan (Ecbatana). Their consolidation in Iran is believed to have occurred during the 8th century BC. In the 7th century BC, all of western Iran and some other territories were under Median rule, but their precise geographic extent remains unknown.[4]")
        message.channel.send(medd)
    }
    if(command == `${prefix}timurid`) {
        let timi = new discord.MessageEmbed
        timi.setTitle("View More")
        timi.setURL("https://en.wikipedia.org/wiki/Timurid_Empire")
        timi.setImage("https://cdn.discordapp.com/attachments/1079453870025080935/1080805253508767815/chingiz.jpg")
        timi.setDescription("The Timurid Empire (Persian: تیموریان), self-designated as Gurkani (Persian: گورکانیان Gūrkāniyān), was a late medieval, culturally Persianate,[6][7] Turco-Mongol empire[8][9] that dominated Greater Iran in the early 15th century, comprising modern-day Iran, Iraq, Afghanistan, much of Central Asia, the South Caucasus, as well as most of contemporary Pakistan and parts of contemporary North India and Turkey.")
        message.channel.send(timi)
    }
    if(command == `${prefix}`) {
        let errorEmbed = new discord.MessageEmbed
        errorEmbed.setTitle("سرور پشتیبانی")
        errorEmbed.setURL("https://discord.gg/UgGVr5Zn")
        errorEmbed.setAuthor(":( به نظر می رسد که سلسه مورد نظر شما داخل لیست قرار ندارد", message.author.displayAvatarURL())
        errorEmbed.setDescription("لطفا  لیست سلسه  ها را مرور کنید و در  صورت نبود ان در لیست لطفا به سرور دیسکورد ما مراجعه کنید")
        message.channel.send(errorEmbed)     
    }
    if(command == `${prefix}help`) {
        let helpEmbed = new discord.MessageEmbed
        helpEmbed.setTitle(`${client.user.tag} commands`)
        helpEmbed.addField("ph!!timurid", 'timurid empire')
        helpEmbed.addField("ph!!medes", 'medes dynasty')
        helpEmbed.addField("ph!!parthian", 'parthian dynasty')
        helpEmbed.addField("ph!!ghaznavids", 'ghaznavids empire')
        helpEmbed.addField("ph!!seljuk", 'seljuk empire')
        helpEmbed.addField("ph!!pahlavi", 'pahlavi dynasty')
        helpEmbed.addField("ph!!zand", 'zandian dynasty')
        helpEmbed.addField("ph!!qajar", 'qajar dynasty')
        helpEmbed.addField("ph!!khwarazmian", 'khwarazmian empire')
        helpEmbed.addField("ph!!afsharid", 'afsharid empire')
        helpEmbed.addField("ph!!saffarid", 'saffarid dynasty')
        helpEmbed.addField("ph!!safavid", 'safavid empire')
        helpEmbed.addField("ph!!sasanian", 'sasanian great empire :D')
        helpEmbed.addField("ph!!achaemenid", 'achaemenid great empire ! :D created by Cyrus The Great')
        helpEmbed.addField("ph!!cyrusthegreat", 'cyrus the great ! :D')
        helpEmbed.addField("ph!!falhafez", 'get the falhafez')
        helpEmbed.addField("ph!!samanian", 'samanian dynasty')
        helpEmbed.addField("ph!!avatar", 'View Your Avatar')
        helpEmbed.addField("ph!!proto-elamities", 'proto-elamities dynasty')
        helpEmbed.addField("ph!!elam", 'elam  dynasty')
        helpEmbed.addField("ph!!ziyarid", 'ziyarid dynasty')
        helpEmbed.addField("ph!!buyid", 'buyid dynasty')
        helpEmbed.addField("ph!!ghazal", 'ghazal')
        helpEmbed.addField("ph!!sanjesh", 'aryan sanj')
        helpEmbed.setTimestamp()
        helpEmbed.setFooter("Made By just_amirHeHe#0485")
        message.channel.send(helpEmbed)
    }
    if(command == `${prefix}proto-elamities`) {
        let el = new discord.MessageEmbed
        el.setTitle("View More")
        el.setImage("https://cdn.discordapp.com/attachments/1025709176929931348/1080528716553273344/images_25.jpg")
        el.setURL("https://en.wikipedia.org/wiki/Proto-Elamite")
        el.setDescription("The Proto-Elamite period, also known as Susa III, is a chronological era in the ancient history of the area of Elam, dating from c. 3100 BC to 2700 BC.[3][4][5] In archaeological terms this corresponds to the late Banesh period. Proto-Elamite sites are recognized as the oldest civilization in the territory of present-day Iran.")
        message.channel.send(el)
    }
    if(command == `${prefix}elam`) {
        let elam = new discord.MessageEmbed
        elam.setTitle("View More")
        elam.setURL("https://en.wikipedia.org/wiki/Elam")
        elam.setImage("https://cdn.discordapp.com/attachments/1025709176929931348/1080528716553273344/images_25.jpg")
        elam.setDescription("Elam (/ˈiːləm/; Linear Elamite: Ha-ta-m-ti.jpg hatamti; Cuneiform Elamite: 𒁹𒄬𒆷𒁶𒋾 ḫalatamti; Sumerian: 𒉏𒈠 elam; Akkadian: 𒉏𒈠𒆠 elamtu; Hebrew: עֵילָם ʿēlām; Old Persian: 𐎢𐎺𐎩 hūja)[1][2] was an ancient civilization centered in the far west and southwest of modern-day Iran, stretching from the lowlands of what is now Khuzestan and Ilam Province as well as a small part of southern Iraq. The modern name Elam stems from the Sumerian transliteration elam(a), along with the later Akkadian elamtu, and the Elamite haltamti. Elamite states were among the leading political forces of the Ancient Near East.[3] In classical literature, Elam was also known as Susiana (US: /ˌsuːʒiˈænə/ UK: /ˌsuːziˈɑːnə/; Ancient Greek: Σουσιανή Sousiānḗ), a name derived from its capital Susa.[4]")
        message.channel.send(elam)
    }
    if(command == `${prefix}ziyarid`) {
        let zia = new discord.MessageEmbed
        zia.setTitle("View More")
        zia.setURL("https://en.wikipedia.org/wiki/Ziyarid_dynasty")
        zia.setImage("https://cdn.discordapp.com/attachments/1079453870025080935/1080807509129961483/images_31.jpg")
        zia.setDescription("The Ziyarid dynasty (Persian: زیاریان) was an Iranian dynasty of Gilaki origin that ruled Tabaristan from 931 to 1090 during the Iranian Intermezzo period. The empire rose to prominence during the leadership of Mardavij. After his death, his brother Vushmgir and his Samanid allies led the dynasty in wrestling for control over territory against the Buyids in the early- to mid-10th century. When Vushmgir died, his sons Bisutun and Qabus fought for influence. Qabus would eventually outlive his brother and ruled the kingdom. However, Qabus was placed in exile from 980 to 998 by the Buyid ruler, Adud al-Dawla who would then dominate Tabaristan, the heartland of Ziyarid power. A succession of other rulers came to rule the kingdom with Ghaznavid support in the early 11th century. The Nizari Ismaili state invaded and ended Ziyarid rule in 1090.")
        message.channel.send(zia)
    }
    if(command == `${prefix}buyid`) {
        let buy =  new discord.MessageEmbed
        buy.setTitle("View More")
        buy.setURL("https://en.wikipedia.org/wiki/Buyid_dynasty")
        buy.setImage("https://cdn.discordapp.com/attachments/1079453870025080935/1080804804189761616/200px-Dailam_soldier.jpg")
        buy.setDescription("The Buyid dynasty (Persian: آل بویه, romanized: Āl-e Būya), also spelled Buwayhid (Arabic: البويهية, romanized: Al-Buwayhiyyah), was a Shia Muslim Iranian dynasty[3] of Daylamite origin,[a] which mainly ruled over Iraq and central and southern Iran from 934 to 1062. Coupled with the rise of other Iranian dynasties in the region, the approximate century of Buyid rule represents the period in Iranian history sometimes called the 'Iranian Intermezzo' since, after the Muslim conquest of Persia, it was an interlude between the rule of the Abbasid Caliphate and the Seljuk Empire.[6]")
        message.channel.send(buy)
    }
    if(command == `${prefix}ghazal`) {
        const randomghazal = Math.floor(Math.random() * ghazals.length);
        const randomghazals = ghazals[randomghazal];
        let ghazaliat = new discord.MessageEmbed
        ghazaliat.setTitle("غزلیات حافظ", message.author.displayAvatarURL())
        ghazaliat.setDescription(randomghazals)
        ghazaliat.setImage("https://cdn.discordapp.com/attachments/1025709176929931348/1080450300512575488/ImageHandler.jpg")
        message.channel.send(ghazaliat)
    }
    if(command == `${prefix}say`) {
        message.delete()
        message.channel.send(message)
    }
})

client.login(config.token)