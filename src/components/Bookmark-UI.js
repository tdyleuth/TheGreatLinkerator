import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Bookmarks from './Bookmarks'
import axios from 'axios';

const BASE_URL = "http://localhost:3000/api/links"

export default function BookmarkUI(){

    let bookmarkRender = [];

    async function createBookMark() {

        const token = localStorage.getItem('token')
        const headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ token }`} 
                }

        try{
            const { data: { links } } = await axios.get(BASE_URL + '/user', headers);

            const bookmarkArr = links.map((bookmark) => {

                const { id, name, url, comment, tags, clicks, datecreated } = bookmark
    
                const bookmarkCard = (
                        <Bookmarks key={id} id={id} name={name} url={url} tags={tags} clickCount={clicks} dateCreated={datecreated} comment='I am a comment'/>
                );
    
                bookmarkRender.push(bookmarkCard);
                return bookmarkCard;
            });
            
            return bookmarkArr;
        }
        catch(err){
            console.error(err)
            throw err;
        }
    }
        
    createBookMark()
    .then((result) => bookmarkRender = result)
    .then(() => console.log('bookmarkrender inner is ', bookmarkRender));

    console.log('bookmark render outer is', bookmarkRender);
    
    return(
        <div id='bookmark-ui'>

            <Bookmarks id='9' key='9' name='Test' url='https://www.google.com' tags='something' clickCount='5' dateCreated='June 5th, 2020' dateModified='July 1st, 2020' comment='I am a comment. I cant be short, but I can also be long. This is just filler content though.sabvazadevishuzatanapemusceregmacowmewzewzugfuvpalupdozejoiferinirizkuriagrovgebkugezmujjimbacjocaebsahgehbuduneflodirmoheahuzaufravkancuelladrazhebhucocgujorpurvizurbupfuvhasalcihionewerajguznenoupvupfezumibaedecomvejaminhowebiditgutaodovaebaijoesefivzuvijzilhucjuhzudpiocfurcijiwfebzepakhacogrubitzoheponbategdoznazotadjaniovdeecvaehairaculfiwuzvouhabegnaupguzivmalvefeumluvokfetkipawiheicredizmevuhwovincidcogubanijtubapiggasurodkevuwgusalapujupinowbonaedwizonemitfepdovlahahufhuhrondicepnelsordeomoujadodacdakirofurigmijgugrekobivahidiawkuruunmueciloritecocarzisfehecosimdotupabefjitewudilduthuhettiwumrofkewewuptidifersedituwiahilahajojiapugaverajulofmekuliwefbozcizepuhafidepawevazerejewubiflujircuceufufigevimafetjirivakesduemiaviuluemlicokzulaepguokzofiwesnuitovutodobjejalokivaekerkukaudihaflizdodujilurlatahupkotokgevegremipbewujefdejwowfecozajzimohefukkazvioleufezidnulnesciipwuafmomirohefotukbevamhefmutsabatbisnizeljubujciidvoultipgahdokirwacboilebezofifamsapotompepivozmoktuecwotopomdemreepjiikifitdifzabojnupmevasvicemungawumihseavivuolaracicuutvejapenozetcubatajokjukijesajsersuregdahohihpobepjenzaemotutazjuuvzavjoavragakviicujotinlupicejikojinzetviloagsuzpelellotoselgebpo' />

            <Bookmarks id='9' key='9' name='Test' url='https://www.google.com' tags='something' clickCount='5' dateCreated='June 5th, 2020' dateModified='July 1st, 2020' comment='I am a comment. I cant be short, but I can also be long. This is just filler content though.sabvazadevishuzatanapemusceregmacowmewzewzugfuvpalupdozejoiferinirizkuriagrovgebkugezmujjimbacjocaebsahgehbuduneflodirmoheahuzaufravkancuelladrazhebhucocgujorpurvizurbupfuvhasalcihionewerajguznenoupvupfezumibaedecomvejaminhowebiditgutaodovaebaijoesefivzuvijzilhucjuhzudpiocfurcijiwfebzepakhacogrubitzoheponbategdoznazotadjaniovdeecvaehairaculfiwuzvouhabegnaupguzivmalvefeumluvokfetkipawiheicredizmevuhwovincidcogubanijtubapiggasurodkevuwgusalapujupinowbonaedwizonemitfepdovlahahufhuhrondicepnelsordeomoujadodacdakirofurigmijgugrekobivahidiawkuruunmueciloritecocarzisfehecosimdotupabefjitewudilduthuhettiwumrofkewewuptidifersedituwiahilahajojiapugaverajulofmekuliwefbozcizepuhafidepawevazerejewubiflujircuceufufigevimafetjirivakesduemiaviuluemlicokzulaepguokzofiwesnuitovutodobjejalokivaekerkukaudihaflizdodujilurlatahupkotokgevegremipbewujefdejwowfecozajzimohefukkazvioleufezidnulnesciipwuafmomirohefotukbevamhefmutsabatbisnizeljubujciidvoultipgahdokirwacboilebezofifamsapotompepivozmoktuecwotopomdemreepjiikifitdifzabojnupmevasvicemungawumihseavivuolaracicuutvejapenozetcubatajokjukijesajsersuregdahohihpobepjenzaemotutazjuuvzavjoavragakviicujotinlupicejikojinzetviloagsuzpelellotoselgebpo' />

            <Bookmarks id='9' key='9' name='Test' url='https://www.google.com' tags='something' clickCount='5' dateCreated='June 5th, 2020' dateModified='July 1st, 2020' comment='I am a comment. I cant be short, but I can also be long. This is just filler content though.sabvazadevishuzatanapemusceregmacowmewzewzugfuvpalupdozejoiferinirizkuriagrovgebkugezmujjimbacjocaebsahgehbuduneflodirmoheahuzaufravkancuelladrazhebhucocgujorpurvizurbupfuvhasalcihionewerajguznenoupvupfezumibaedecomvejaminhowebiditgutaodovaebaijoesefivzuvijzilhucjuhzudpiocfurcijiwfebzepakhacogrubitzoheponbategdoznazotadjaniovdeecvaehairaculfiwuzvouhabegnaupguzivmalvefeumluvokfetkipawiheicredizmevuhwovincidcogubanijtubapiggasurodkevuwgusalapujupinowbonaedwizonemitfepdovlahahufhuhrondicepnelsordeomoujadodacdakirofurigmijgugrekobivahidiawkuruunmueciloritecocarzisfehecosimdotupabefjitewudilduthuhettiwumrofkewewuptidifersedituwiahilahajojiapugaverajulofmekuliwefbozcizepuhafidepawevazerejewubiflujircuceufufigevimafetjirivakesduemiaviuluemlicokzulaepguokzofiwesnuitovutodobjejalokivaekerkukaudihaflizdodujilurlatahupkotokgevegremipbewujefdejwowfecozajzimohefukkazvioleufezidnulnesciipwuafmomirohefotukbevamhefmutsabatbisnizeljubujciidvoultipgahdokirwacboilebezofifamsapotompepivozmoktuecwotopomdemreepjiikifitdifzabojnupmevasvicemungawumihseavivuolaracicuutvejapenozetcubatajokjukijesajsersuregdahohihpobepjenzaemotutazjuuvzavjoavragakviicujotinlupicejikojinzetviloagsuzpelellotoselgebpo' />

            <Bookmarks id='9' key='9' name='Test' url='https://www.google.com' tags='something' clickCount='5' dateCreated='June 5th, 2020' dateModified='July 1st, 2020' comment='I am a comment. I cant be short, but I can also be long. This is just filler content though.sabvazadevishuzatanapemusceregmacowmewzewzugfuvpalupdozejoiferinirizkuriagrovgebkugezmujjimbacjocaebsahgehbuduneflodirmoheahuzaufravkancuelladrazhebhucocgujorpurvizurbupfuvhasalcihionewerajguznenoupvupfezumibaedecomvejaminhowebiditgutaodovaebaijoesefivzuvijzilhucjuhzudpiocfurcijiwfebzepakhacogrubitzoheponbategdoznazotadjaniovdeecvaehairaculfiwuzvouhabegnaupguzivmalvefeumluvokfetkipawiheicredizmevuhwovincidcogubanijtubapiggasurodkevuwgusalapujupinowbonaedwizonemitfepdovlahahufhuhrondicepnelsordeomoujadodacdakirofurigmijgugrekobivahidiawkuruunmueciloritecocarzisfehecosimdotupabefjitewudilduthuhettiwumrofkewewuptidifersedituwiahilahajojiapugaverajulofmekuliwefbozcizepuhafidepawevazerejewubiflujircuceufufigevimafetjirivakesduemiaviuluemlicokzulaepguokzofiwesnuitovutodobjejalokivaekerkukaudihaflizdodujilurlatahupkotokgevegremipbewujefdejwowfecozajzimohefukkazvioleufezidnulnesciipwuafmomirohefotukbevamhefmutsabatbisnizeljubujciidvoultipgahdokirwacboilebezofifamsapotompepivozmoktuecwotopomdemreepjiikifitdifzabojnupmevasvicemungawumihseavivuolaracicuutvejapenozetcubatajokjukijesajsersuregdahohihpobepjenzaemotutazjuuvzavjoavragakviicujotinlupicejikojinzetviloagsuzpelellotoselgebpo' />

            <Bookmarks id='9' key='9' name='Test' url='https://www.google.com' tags='something' clickCount='5' dateCreated='June 5th, 2020' dateModified='July 1st, 2020' comment='I am a comment. I cant be short, but I can also be long. This is just filler content though.sabvazadevishuzatanapemusceregmacowmewzewzugfuvpalupdozejoiferinirizkuriagrovgebkugezmujjimbacjocaebsahgehbuduneflodirmoheahuzaufravkancuelladrazhebhucocgujorpurvizurbupfuvhasalcihionewerajguznenoupvupfezumibaedecomvejaminhowebiditgutaodovaebaijoesefivzuvijzilhucjuhzudpiocfurcijiwfebzepakhacogrubitzoheponbategdoznazotadjaniovdeecvaehairac' />
            

        </div>
    )
    
    
    
    
}