'use strict';
const db =require("../../backend/models");
const CountryModal = db.Country;
const countryList =[
    {"name": "Afghanistan", "code": "AF","country_code":"93"},
    {"name": "Åland Islands", "code": "AX","country_code":"358"},
    {"name": "Albania", "code": "AL","country_code":"355"},
    {"name": "Algeria", "code": "DZ","country_code":"213"},
    {"name": "American Samoa", "code": "AS","country_code":"684"},
    {"name": "AndorrA", "code": "AD","country_code":"376"},
    {"name": "Angola", "code": "AO","country_code":"244"},
    {"name": "Anguilla", "code": "AI","country_code":"213"},
    {"name": "Antarctica", "code": "AQ","country_code":"672"},
    {"name": "Antigua and Barbuda", "code": "AG","country_code":"268"},
    {"name": "Argentina", "code": "AR","country_code":"54"},
    {"name": "Armenia", "code": "AM","country_code":"374"},
    {"name": "Aruba", "code": "AW","country_code":"297"},
    {"name": "Australia", "code": "AU","country_code":"61"},
    {"name": "Austria", "code": "AT","country_code":"43"},
    {"name": "Azerbaijan", "code": "AZ","country_code":"994"},
    {"name": "Bahamas", "code": "BS","country_code":"242"},
    {"name": "Bahrain", "code": "BH","country_code":"973"},
    {"name": "Bangladesh", "code": "BD","country_code":"880"},
    {"name": "Barbados", "code": "BB","country_code":"246"},
    {"name": "Belarus", "code": "BY","country_code":"375"},
    {"name": "Belgium", "code": "BE","country_code":"32"},
    {"name": "Belize", "code": "BZ","country_code":"501"},
    {"name": "Benin", "code": "BJ","country_code":"229"},
    {"name": "Bermuda", "code": "BM","country_code":"443"},
    {"name": "Bhutan", "code": "BT","country_code":"975"},
    {"name": "Bolivia", "code": "BO","country_code":"591"},
    {"name": "Bosnia and Herzegovina", "code": "BA","country_code":"387"},
    {"name": "Botswana", "code": "BW","country_code":"267"},
    {"name": "Bouvet Island", "code": "BV","country_code":"47"},
    {"name": "Brazil", "code": "BR","country_code":"55"},
    {"name": "British Indian Ocean Territory", "code": "IO","country_code":"246"},
    {"name": "Brunei Darussalam", "code": "BN","country_code":"673"},
    {"name": "Bulgaria", "code": "BG","country_code":"359"},
    {"name": "Burkina Faso", "code": "BF","country_code":"226"},
    {"name": "Burundi", "code": "BI","country_code":"257"},
    {"name": "Cambodia", "code": "KH","country_code":"855"},
    {"name": "Cameroon", "code": "CM","country_code":"237"},
    {"name": "Canada", "code": "CA","country_code":"1"},
    {"name": "Cape Verde", "code": "CV","country_code":"238"},
    {"name": "Cayman Islands", "code": "KY","country_code":"345"},
    {"name": "Central African Republic", "code": "CF","country_code":"236"},
    {"name": "Chad", "code": "TD","country_code":"235"},
    {"name": "Chile", "code": "CL","country_code":"56"},
    {"name": "China", "code": "CN","country_code":"86"},
    {"name": "Christmas Island", "code": "CX","country_code":"61"},
    {"name": "Cocos (Keeling) Islands", "code": "CC","country_code":"61"},
    {"name": "Colombia", "code": "CO","country_code":"57"},
    {"name": "Comoros", "code": "KM","country_code":"269"},
    {"name": "Congo", "code": "CG","country_code":"243"},
    {"name": "Congo, The Democratic Republic of the", "code": "CD","country_code":"243"},
    {"name": "Cook Islands", "code": "CK","country_code":"682"},
    {"name": "Costa Rica", "code": "CR","country_code":"506"},
    {"name": "Cote D\"Ivoire", "code": "CI","country_code":"225"},
    {"name": "Croatia", "code": "HR","country_code":"385"},
    {"name": "Cuba", "code": "CU","country_code":"53"},
    {"name": "Cyprus", "code": "CY","country_code":"357"},
    {"name": "Czech Republic", "code": "CZ","country_code":"420"},
    {"name": "Denmark", "code": "DK","country_code":"45"},
    {"name": "Djibouti", "code": "DJ","country_code":"253"},
    {"name": "Dominica", "code": "DM","country_code":"767"},
    {"name": "Dominican Republic", "code": "DO","country_code":"849"},
    {"name": "Ecuador", "code": "EC","country_code":"593"},
    {"name": "Egypt", "code": "EG","country_code":"20"},
    {"name": "El Salvador", "code": "SV","country_code":"503"},
    {"name": "Equatorial Guinea", "code": "GQ","country_code":"240"},
    {"name": "Eritrea", "code": "ER","country_code":"291"},
    {"name": "Estonia", "code": "EE","country_code":"372"},
    {"name": "Ethiopia", "code": "ET","country_code":"251"},
    {"name": "Falkland Islands (Malvinas)", "code": "FK","country_code":"500"},
    {"name": "Faroe Islands", "code": "FO","country_code":"298"},
    {"name": "Fiji", "code": "FJ","country_code":"679"},
    {"name": "Finland", "code": "FI","country_code":"358"},
    {"name": "France", "code": "FR","country_code":"33"},
    {"name": "French Guiana", "code": "GF","country_code":"594"},
    {"name": "French Polynesia", "code": "PF","country_code":"689"},
    {"name": "French Southern Territories", "code": "TF","country_code":"260"},
    {"name": "Gabon", "code": "GA","country_code":"241"},
    {"name": "Gambia", "code": "GM","country_code":"220"},
    {"name": "Georgia", "code": "GE","country_code":"995"},
    {"name": "Germany", "code": "DE","country_code":"49"},
    {"name": "Ghana", "code": "GH","country_code":"233"},
    {"name": "Gibraltar", "code": "GI","country_code":"350"},
    {"name": "Greece", "code": "GR","country_code":"30"},
    {"name": "Greenland", "code": "GL","country_code":"299"},
    {"name": "Grenada", "code": "GD","country_code":"473"},
    {"name": "Guadeloupe", "code": "GP","country_code":"590"},
    {"name": "Guam", "code": "GU","country_code":"671"},
    {"name": "Guatemala", "code": "GT","country_code":"502"},
    {"name": "Guernsey", "code": "GG","country_code":"44"},
    {"name": "Guinea", "code": "GN","country_code":"224"},
    {"name": "Guinea-Bissau", "code": "GW","country_code":"245"},
    {"name": "Guyana", "code": "GY","country_code":"592"},
    {"name": "Haiti", "code": "HT","country_code":"509"},
    {"name": "Heard Island and Mcdonald Islands", "code": "HM","country_code":"166"},
    {"name": "Holy See (Vatican City State)", "code": "VA","country_code":"379"},
    {"name": "Honduras", "code": "HN","country_code":'504'},
    {"name": "Hong Kong", "code": "HK","country_code":"852"},
    {"name": "Hungary", "code": "HU","country_code":"36"},
    {"name": "Iceland", "code": "IS","country_code":"354"},
    {"name": "India", "code": "IN","country_code":"91"},
    {"name": "Indonesia", "code": "ID","country_code":'62'},
    {"name": "Iran, Islamic Republic Of", "code": "IR","country_code":"98"},
    {"name": "Iraq", "code": "IQ","country_code":'964'},
    {"name": "Ireland", "code": "IE","country_code":'353'},
    {"name": "Isle of Man", "code": "IM","country_code":"44"},
    {"name": "Israel", "code": "IL","country_code":"972"},
    {"name": "Italy", "code": "IT","country_code":"39"},
    {"name": "Jamaica", "code": "JM","country_code":'53'},
    {"name": "Japan", "code": "JP","country_code":"81"},
    {"name": "Jersey", "code": "JE","country_code":"44"},
    {"name": "Jordan", "code": "JO","country_code":'962'},
    {"name": "Kazakhstan", "code": "KZ","country_code":"7"},
    {"name": "Kenya", "code": "KE","country_code":"254"},
    {"name": "Kiribati", "code": "KI","country_code":"686"},
    {"name": "Korea, Democratic People\"S Republic of", "code": "KP","country_code":"850"},
    {"name": "Korea, Republic of", "code": "KR","country_code":"82"},
    {"name": "Kuwait", "code": "KW","country_code":"965"},
    {"name": "Kyrgyzstan", "code": "KG","country_code":"996"},
    {"name": "Lao People\"S Democratic Republic", "code": "LA","country_code":"856"},
    {"name": "Latvia", "code": "LV","country_code":"371"},
    {"name": "Lebanon", "code": "LB","country_code":"961"},
    {"name": "Lesotho", "code": "LS","country_code":"266"},
    {"name": "Liberia", "code": "LR","country_code":"231"},
    {"name": "Libyan Arab Jamahiriya", "code": "LY","country_code":"218"},
    {"name": "Liechtenstein", "code": "LI","country_code":"423"},
    {"name": "Lithuania", "code": "LT","country_code":"370"},
    {"name": "Luxembourg", "code": "LU","country_code":"352"},
    {"name": "Macao", "code": "MO","country_code":"853"},
    {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK","country_code":"389"},
    {"name": "Madagascar", "code": "MG","country_code":"261"},
    {"name": "Malawi", "code": "MW","country_code":"265"},
    {"name": "Malaysia", "code": "MY","country_code":"60"},
    {"name": "Maldives", "code": "MV","country_code":"960"},
    {"name": "Mali", "code": "ML","country_code":"223"},
    {"name": "Malta", "code": "MT","country_code":"356"},
    {"name": "Marshall Islands", "code": "MH","country_code":"692"},
    {"name": "Martinique", "code": "MQ","country_code":"596"},
    {"name": "Mauritania", "code": "MR","country_code":"222"},
    {"name": "Mauritius", "code": "MU","country_code":"230"},
    {"name": "Mayotte", "code": "YT","country_code":"262"},
    {"name": "Mexico", "code": "MX","country_code":"52"},
    {"name": "Micronesia, Federated States of", "code": "FM","country_code":"691"},
    {"name": "Moldova, Republic of", "code": "MD","country_code":"373"},
    {"name": "Monaco", "code": "MC","country_code":"377"},
    {"name": "Mongolia", "code": "MN","country_code":"976"},
    {"name": "Montserrat", "code": "MS","country_code":"664"},
    {"name": "Morocco", "code": "MA","country_code":"212"},
    {"name": "Mozambique", "code": "MZ","country_code":"258"},
    {"name": "Myanmar", "code": "MM","country_code":"95"},
    {"name": "Namibia", "code": "NA","country_code":"264"},
    {"name": "Nauru", "code": "NR","country_code":"674"},
    {"name": "Nepal", "code": "NP","country_code":"977"},
    {"name": "Netherlands", "code": "NL","country_code":"31"},
    {"name": "Netherlands Antilles", "code": "AN","country_code":"599"},
    {"name": "New Caledonia", "code": "NC","country_code":"687"},
    {"name": "New Zealand", "code": "NZ","country_code":"64"},
    {"name": "Nicaragua", "code": "NI","country_code":"505"},
    {"name": "Niger", "code": "NE","country_code":'227'},
    {"name": "Nigeria", "code": "NG","country_code":"234"},
    {"name": "Niue", "code": "NU","country_code":"683"},
    {"name": "Norfolk Island", "code": "NF","country_code":"672"},
    {"name": "Northern Mariana Islands", "code": "MP","country_code":"670"},
    {"name": "Norway", "code": "NO","country_code":"47"},
    {"name": "Oman", "code": "OM","country_code":"968"},
    {"name": "Pakistan", "code": "PK","country_code":"92"},
    {"name": "Palau", "code": "PW","country_code":"680"},
    {"name": "Palestinian Territory, Occupied", "code": "PS","country_code":"970"},
    {"name": "Panama", "code": "PA","country_code":"507"},
    {"name": "Papua New Guinea", "code": "PG","country_code":"975"},
    {"name": "Paraguay", "code": "PY","country_code":"595"},
    {"name": "Peru", "code": "PE","country_code":"51"},
    {"name": "Philippines", "code": "PH","country_code":"63"},
    {"name": "Pitcairn", "code": "PN","country_code":"64"},
    {"name": "Poland", "code": "PL","country_code":"48"},
    {"name": "Portugal", "code": "PT","country_code":"351"},
    {"name": "Puerto Rico", "code": "PR","country_code":"53"},
    {"name": "Qatar", "code": "QA","country_code":"974"},
    {"name": "Reunion", "code": "RE","country_code":"262"},
    {"name": "Romania", "code": "RO","country_code":"40"},
    {"name": "Russian Federation", "code": "RU","country_code":"7"},
    {"name": "RWANDA", "code": "RW","country_code":"250"},
    {"name": "Saint Helena", "code": "SH","country_code":"290"},
    {"name": "Saint Kitts and Nevis", "code": "KN","country_code":"239"},
    {"name": "Saint Lucia", "code": "LC","country_code":"758"},
    {"name": "Saint Pierre and Miquelon", "code": "PM","country_code":"508"},
    {"name": "Saint Vincent and the Grenadines", "code": "VC","country_code":"1"},
    {"name": "Samoa", "code": "WS","country_code":"685"},
    {"name": "San Marino", "code": "SM","country_code":"378"},
    {"name": "Sao Tome and Principe", "code": "ST","country_code":"239"},
    {"name": "Saudi Arabia", "code": "SA","country_code":"966"},
    {"name": "Senegal", "code": "SN","country_code":"221"},
    {"name": "Serbia and Montenegro", "code": "CS","country_code":"42"},
    {"name": "Seychelles", "code": "SC","country_code":"248"},
    {"name": "Sierra Leone", "code": "SL","country_code":"232"},
    {"name": "Singapore", "code": "SG","country_code":"65"},
    {"name": "Slovakia", "code": "SK","country_code":"421"},
    {"name": "Slovenia", "code": "SI","country_code":"386"},
    {"name": "Solomon Islands", "code": "SB","country_code":"677"},
    {"name": "Somalia", "code": "SO","country_code":"252"},
    {"name": "South Africa", "code": "ZA","country_code":"27"},
    {"name": "South Georgia and the South Sandwich Islands", "code": "GS","country_code":"500"},
    {"name": "Spain", "code": "ES","country_code":"34"},
    {"name": "Sri Lanka", "code": "LK","country_code":"94"},
    {"name": "Sudan", "code": "SD","country_code":"211"},
    {"name": "Suriname", "code": "SR","country_code":"597"},
    {"name": "Svalbard and Jan Mayen", "code": "SJ","country_code":"47"},
    {"name": "Swaziland", "code": "SZ","country_code":"268"},
    {"name": "Sweden", "code": "SE","country_code":"46"},
    {"name": "Switzerland", "code": "CH","country_code":"41"},
    {"name": "Syrian Arab Republic", "code": "SY","country_code":"963"},
    {"name": "Taiwan", "code": "TW","country_code":"886"},
    {"name": "Tajikistan", "code": "TJ","country_code":"992"},
    {"name": "Tanzania, United Republic of", "code": "TZ","country_code":"255"},
    {"name": "Thailand", "code": "TH","country_code":"66"},
    {"name": "Timor-Leste", "code": "TL","country_code":"670"},
    {"name": "Togo", "code": "TG","country_code":"228"},
    {"name": "Tokelau", "code": "TK","country_code":"690"},
    {"name": "Tonga", "code": "TO","country_code":"676"},
    {"name": "Trinidad and Tobago", "code": "TT","country_code":"868"},
    {"name": "Tunisia", "code": "TN","country_code":"216"},
    {"name": "Turkey", "code": "TR","country_code":"90"},
    {"name": "Turkmenistan", "code": "TM","country_code":"993"},
    {"name": "Turks and Caicos Islands", "code": "TC","country_code":"649"},
    {"name": "Tuvalu", "code": "TV","country_code":"688"},
    {"name": "Uganda", "code": "UG","country_code":"256"},
    {"name": "Ukraine", "code": "UA","country_code":"380"},
    {"name": "United Arab Emirates", "code": "AE","country_code":"972"},
    {"name": "United Kingdom", "code": "GB","country_code":"44"},
    {"name": "United States", "code": "US","country_code":"61"},
    {"name": "United States Minor Outlying Islands", "code": "UM","country_code":"32"},
    {"name": "Uruguay", "code": "UY","country_code":"598"},
    {"name": "Uzbekistan", "code": "UZ","country_code":"998"},
    {"name": "Vanuatu", "code": "VU","country_code":"678"},
    {"name": "Venezuela", "code": "VE","country_code":"58"},
    {"name": "Viet Nam", "code": "VN","country_code":"84"},
    {"name": "Virgin Islands, British", "code": "VG","country_code":"1"},
    {"name": "Virgin Islands, U.S.", "code": "VI","country_code":"340"},
    {"name": "Wallis and Futuna", "code": "WF","country_code":"681"},
    {"name": "Western Sahara", "code": "EH","country_code":"212"},
    {"name": "Yemen", "code": "YE","country_code":"967"},
    {"name": "Zambia", "code": "ZM","country_code":"260"},
    {"name": "Zimbabwe", "code": "ZW","country_code":"263"}
];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
            for (const country of countryList) {
            const record = {
                name: country.name,
                short_name: country.code,
                country_code: "+"+country.country_code,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const [countryInstance, created] = await CountryModal.findOrCreate({
                where: { short_name: country.code },
                defaults: record
            });

            if (!created) {
                await CountryModal.update(record, {
                    where: { short_name: country.code }
                });
            }
        }
},


  async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('countries', null, {});
  }
};