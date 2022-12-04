

function addContent(query, content, textType) {
    // textType options are from the following five:
    // 'uneditable', 'argument', 'admin', 'editable', 'conditional'
        document.querySelectorAll(query).forEach((c) => c.setAttribute(`data-tooltip-${textType}`, content))
    }

    // Url string manipulation
    const parentUrl =  window.document.URL
    const parentQuery = parentUrl.toLowerCase().split('/')
    let expressCheckoutString;
    let iframeArgs;
    let iframeString;
    let fixedSeriesString;
    
    // Check for secure

    if (parentQuery[5] === 'secure') {

        // Check for express checkout
        if (parentQuery[7] === 'v2') {
            const expressCheck = parentQuery.findIndex((c) => c === 'checkout')

            if (expressCheck >= 0) {
                const secureArray = parentQuery.slice(expressCheck)
                expressCheckoutString = secureArray.join('/')
            }
        }

    } else {

        // All other iframe strings
        const iframeStringFull = parentQuery[parentQuery.length - 1]
        iframeString = iframeStringFull.split('.')[0]
        iframeArgs = iframeStringFull.split('?')[1]
    }

    // Check fixed series url arguments

    if (iframeString === 'fixedseries') {
        fixedSeriesString = iframeArgs.split('=')[1].split('&')[0]
    }
    
    // Add url title at top
    const body = document.querySelector('body')
    body.insertAdjacentHTML('afterbegin', `<h1 class="urlTitle">You are are on the iframe ${expressCheckoutString ? expressCheckoutString:iframeString}</h1>`)

    // Classic Checkout
    // secure/checkout/v2
    // secure/checkout/v2/startcheckoutlogin
    // secure/checkout/v2/personaldetails
    // secure/checkout/v2/ticketdelivery
    // secure/checkout/v2/merchandisedelivery
    // secure/checkout/v2/additionaldetails
    // secure/checkout/v2/donations
    // secure/checkout/v2/giftaid
    // secure/checkout/v2/contactpreferences
    // secure/checkout/v2/ordersummary
    // secure/checkout/v2/billingdetails
    // secure/checkout/v2/payment
    // secure/checkout/v2/orderconfirmation

    if(expressCheckoutString) {
        addContent('header > h1.spx-heading-title__checkout', 'Default messaging', 'uneditable')
        addContent('.spx-heading-title__checkout--order-summary', 'Default messaging', 'uneditable')
        addContent('.spx-heading-headline__checkout--personal-details', 'Default messaging', 'uneditable')
        addContent('.spx-heading-headline__checkout--ticket-delivery', 'Default messaging', 'uneditable')
        addContent('.spx-heading-headline__checkout--merchandise-delivery', 'Default messaging', 'uneditable')
        addContent('.spx-heading-headline__checkout--additional-details', 'Default messaging', 'uneditable')
        addContent('.spx-heading-headline__checkout--donations', 'Editable under Settings > System Setup > Donations on Web > Custom header for the donations step in the  new checkout flow. (Plain Text)', 'editable')
        addContent('.spx-heading-headline__checkout--contact-preferences', 'Default messaging', 'uneditable')
        addContent('.spx-heading-headline__checkout--order-summary', 'Default messaging', 'uneditable')
        addContent('.spx-heading-headline__checkout--billing-details', 'Default messaging', 'uneditable')
        addContent('.spx-heading-headline__checkout--payment', 'Default messaging', 'uneditable')
        addContent('p > span.spx-validation-field-error', 'Appears if Express Checkout has not been turned on in Website Admin > Domain Specific Config > Enable Express Checkout', 'conditional')
        addContent('#privacy-policy-header, .spx-wikitext-container__checkout--contact-preferences', 'Optional messaging; editable under Settings > Customers > Privacy Policy', 'editable')
        addContent('.spx-heading-sub-headline__checkout--contact-preferences', 'Pulls from name of Contact Preference Group, editable under Settings > Customers > Contact Preferences', 'editable')

        // Appears in ordersummary and beyond
        addContent('.spx-heading-sub-headline__checkout--ticket-summary', 'Default messaging', 'uneditable')
        addContent('.spx-heading-sub-headline__checkout--final-summary', 'Default messaging', 'uneditable')
        addContent('.spx-heading-sub-headline__checkout--payment-method', 'Default messaging', 'uneditable')
        addContent('.spx-heading-sub-headline__checkout--billing-address', 'Default messaging', 'uneditable')

        if (expressCheckoutString === 'checkout/v2') {
            addContent('.spx-text-copy', 'Default messaging', 'uneditable')
            addContent('.spx-field-container', 'Default messaging', 'uneditable')
            addContent('.spx-wikitext-container__checkout--start-checkout', 'Optional messaging; editable under Settings > Customers > Privacy Policy', 'editable')
            addContent('button', 'Default messaging', 'uneditable')

        } else if (expressCheckoutString === 'checkout/v2/personaldetails') {
            
            addContent('.spx-field-container__checkout--personal-details', 'Default messaging; DOB and phone number as requirements for new account are switches in Settings > Configuration > System Setup > Website > Ensure customers...', 'conditional')
            
        } else if (expressCheckoutString === 'checkout/v2/ticketdelivery') {
            addContent('.spx-legend-guide__checkout--ticket-delivery', 'Default messaging', 'uneditable')
            addContent('.spx-field-container__checkout--ticket-delivery', 'Pulls from delivery options setup per ticket type', 'admin')
            addContent('.spx-label-field__checkout--ticket-delivery', 'Default messaging', 'uneditable')
            addContent('.spx-heading-sub-headline__checkout--ticket-delivery-address', 'Default messaging', 'uneditable')
            addContent('.spx-data-group-address-select', 'Default messaging', 'uneditable')
            addContent('.spx-button-primary__checkout--ticket-delivery', 'Default messaging', 'uneditable')
            
        } else if (expressCheckoutString === 'checkout/v2/merchandisedelivery') {

            addContent('.spx-legend-guide__checkout--merchandise-delivery', 'Default messaging', 'uneditable')
            addContent('form[action="/iframedemo/website/secure/checkout/v2/merchandisedelivery"]', 'Will appear if Allow Postal Delivery is checked off on specific merchandise item', 'admin')
            addContent('.spx-field-container__checkout--merchandise-delivery', 'Default messaging', 'uneditable')
            addContent('.spx-data-delivery-price', 'Pulls from Commission for specific Delivery method', 'admin')
            addContent('.spx-heading-sub-headline__checkout--merchandise-delivery-address', 'Default messaging', 'uneditable')
            addContent('.spx-data-delivery-type', 'Default messaging', 'uneditable')
            
        } else if (expressCheckoutString === 'checkout/v2/additionaldetails') {
            addContent('.spx-wikitext-container__checkout--additional-details','Editable under Settings > System Setup > Custom message for the Additional Details tab on checkout.aspx (i.e. for Order Attribute by Event)', 'editable')
            addContent('.spx-label-field__checkout--additional-details', 'Pulls from name of specific Order Attribute, editable in Settings > Attribute Templates', 'editable')
            
        } else if (expressCheckoutString === 'checkout/v2/donations') {
            addContent('.spx-wikitext-container__checkout--donations', 'Editable under Settings > System Setup > Custom body wikitext for the donations step in the new checkout flow', 'editable')
            addContent('.spx-subsection-container__checkout--donation', 'Appears based upon Event Criteria set in specific Fund', 'admin')
            addContent('.spx-heading-sub-headline__checkout--donation', 'Pulls from Name of specific Fund', 'admin')
            addContent('div.spx-subsection-container.spx-subsection-container__checkout.spx-subsection-container__checkout--donation > .spx-text-copy__checkout--donation', 'Pulls from Description of specific Fund', 'admin')
            addContent('.spx-label-field__checkout--donation', 'Default messaging', 'uneditable')
            addContent('input.spx-input-text.spx-input-text__checkout.spx-input-text__checkout--donation[data-role="Amount"]', 'Pulls from Default Amount for specific Fund','admin')
            addContent('div.spx-field-container__checkout--donation + div.spx-field-container__checkout--donation', 'Displays if turned on in Settings > Configuration > System Setup > Donations > Capture donation recognition on the website', 'conditional')
            addContent('button.spx-button-secondary__checkout--donations', 'Default messaging, displays if switch is turned on in Settings > Configuration > System Setup > Allow customers to continue with their transaction without donating', 'conditional')

        } else if (expressCheckoutString === 'checkout/v2/giftaid') {
            
        } else if (expressCheckoutString === 'checkout/v2/contactpreferences') {
            addContent('.spx-heading-sub-headline__checkout--contact-preferences', 'Pulls from name of Contact Preference Group, editable under Settings > Customers > Contact Preferences', 'editable')
            addContent('.spx-field-container__checkout--contact-preferences', 'Pulls from Text of specific Contact Preference, editable under Settings > Customers > Contact Preferences', 'editable')
            
        } else if (expressCheckoutString === 'checkout/v2/ordersummary') {
            addContent('TermsAndConditionsWikiText', 'Editable under Settings > System Setup > Display Terms and Conditions AND Enter your Terms and Conditions below', 'editable')
            addContent('.spx-heading-sub-headline__checkout--ticket-summary', 'Default messaging', 'uneditable')
            addContent('.spx-subsection-container__checkout--credit', 'Appears according to switch at Settings > Configuration > System Setup > Credits & Commissions > Allow customers to spend account credit via the website', 'conditional')
            addContent('div.spx-subsection-container.spx-subsection-container__checkout.spx-subsection-container__checkout--credit > spx-text-copy.spx-text-copy__checkout spx-text-copy__checkout--credit', 'Default messaging', 'uneditable')
            addContent('.spx-field-container__checkout--credit', 'Default messaging', 'uneditable')
            addContent('.spx-subsection-container__checkout--final-summary', 'Default messaging', 'uneditable')
            addContent('div.spx-field-container.spx-field-container__checkout.spx-field-container__checkout--order-summary', 'Editable under Settings > System Setup > Display Terms and Conditions AND Enter your Terms and Conditions below', 'editable')
            addContent('input.ea-triggers-bound + div.spx-wikitext-container.spx-wikitext-container__checkout.spx-wikitext-container__checkout--order-summary', 'Optional messaging; editable under Settings > Customers > Privacy Policy', 'editable')

        } else if (expressCheckoutString === 'checkout/v2/billingdetails') {

            addContent('#StoreNewCardCheckBoxFieldContainer', 'Appears if card holder wallets have been turned on, default messaging', 'conditional')

        } else if (expressCheckoutString === 'checkout/v2/payment') {
            addContent('.spx-iframe__checkout', 'Default messaging', 'uneditable')
            
        } else if (expressCheckoutString === 'checkout/v2/orderconfirmation') {
            
        }

    } else if (iframeString === 'eventlist'){
        // EventList.aspx
        addContent('.WhatsOnHeading', 'Default messaging', 'uneditable')
        addContent('.MonthList', 'List of months generated by the system automatically based off of current date and furthest Event Instance marked as visible in the future', 'admin')
        addContent('.SearchDescription', 'Dates automatically generated based upon the selected month of the page', 'argument')
        addContent('div.Events', 'Auto generated based upon the dates of Events in the Spektrix System and selected month of the page', 'argument')
        addContent('.Event_Name', 'Pulls from Title of specific Event', 'admin')
        addContent('.Event_Image', 'Pulls from the Image of specific Event. Heavily compressed by our system - for best quality results, use of a CMS/external image source is best', 'admin')
        addContent('span.Event_Description.Event_Detail', 'Pulls directly from the Description of specific Event.', 'admin')
        addContent('.Event_Dates', 'Pulls from Instance dates for specific Event within given date criteria', 'admin')
        addContent('.More_Info.Event_Detail', 'Default messaging', 'uneditable')
        addContent('p.NoEvents', 'Default messaging', 'uneditable')
    } else if (iframeString === 'eventcalendar') {

        addContent('.WhatsOnHeading', 'Default messaging', 'uneditable')
        addContent('.MonthList', 'List of months generated by the system automatically based off of current date and furthest Event Instance marked as visible in the future', 'admin')
        addContent('table', 'Auto generated based upon the dates of Events in the Spektrix System and selected month of the page', 'argument')
        addContent('.Name', 'Pulls from Title of specific Event', 'admin')
        addContent('.Thumbnail > img', 'Pulls from the Image of specific Event. Heavily compressed by our system - for best quality results, use of a CMS/external image source is best', 'admin')
        addContent('.Description', 'Pulls directly from the Description of specific Event.', 'admin')
        addContent('.MoreInfo', 'Default messaging', 'uneditable')


    } else if (iframeString === 'eventdetails') {

        // EventDetails.aspx
        addContent('.DetailsContainer', 'Pulls from the Website Content of the specific event.', 'admin')
        addContent('.DatesAndTimesHeading', 'Default messaging', 'uneditable')
        addContent('#ctl00_ContentPlaceHolder_DateInstructions', 'Default messaging', 'uneditable')
        addContent('ul.MonthList.LinkList', 'Pulls from Instance dates for specific Event','admin')
        addContent('div.EventDates', 'Pulls from Instance dates for specific Event', 'admin')
        addContent('div.PriorityBookingWikiText', 'Optional messaging which appears when Event is only bookable via Priority Booking. Editable under Settings > System Setup > Custom Website Messages > Custom message about priority booking. This appears on chooseseats.aspx when the Instance is only available via priority booking.', 'editable')
        addContent('p.SoldOutText', 'Optional messaging which displays regardless of sold out status. Editable in Website Admin > Domain Specific Config > Sold Out Message', 'editable')
        addContent('#ctl00_ContentPlaceHolder_PriorityBookingMessage', 'Default messaging, appears based upon Settings > Configuration > Queuing > Prompt customers to log in for priority booking', 'conditional')
        addContent('#ctl00_ContentPlaceHolder_RelatedOffersControl1_Container', 'Default messaging, displays if an Offer has been marked as Active on Website and Events in Offer: All', 'conditional')


    } else if (iframeString === 'chooseseats') {
        // ChooseSeats.aspx

        addContent('.ChooseSeatsHeading', 'Editable under Settings > System Setup > Custom Website Messages.', 'editable')
        addContent('#ctl00_ContentPlaceHolder_EventDetails', 'Name of event, date of instance, time of instance. Automatically draws from event and intsnace set up.', 'admin')
        addContent('.AreaAndVenueDetails', 'Pulls automatically from event setup.', 'admin')
        addContent('.InstanceCalendar', 'Default messaging', 'uneditable')
        addContent('.SeatingAreaInstructions', 'Automatically from system - cannot edit text. "10" comes from maximum set for specific Event.', 'uneditable')
        addContent('.SeatingAreaOptionalInstructions', 'Optional message which appears universally across all instances; edited in Settings > Configuration > System Setup > Custom Website Messages > Custom message for seating plans. This appears on chooseseats.aspx', 'editable')
        addContent('.BestAvailableLink', 'Best available link - displays if best available is setup','conditional')
        addContent('.Buttons', 'Default messaging', 'uneditable')
        addContent('.Ticket_Types_Selection', 'Pulls from Price List of specific Instance', 'admin')
        addContent('label.left', 'Ticket Type Name', 'admin')
        addContent('span.Price', 'Price, service charge language hidable in Settings > System Setup > Price Lists > Do not itemize commission', 'conditional')
        addContent('p.Message', 'Default messaging, appears based upon Settings > Configuration > Queuing > Prompt customers to log in for priority booking', 'conditional')
        addContent('#ctl00_ContentPlaceHolder_PriorityBookingWikiTextViewer', 'Optional messaging which appears when Event is only bookable via Priority Booking. Editable under Settings > System Setup > Custom Website Messages > Custom message about priority booking. This appears on chooseseats.aspx when the Instance is only available via priority booking.', 'editable')

        // ChooseSeat.aspx (Reserved)
        addContent('table.PriceListTable', 'Pulls from Price List for specific Instance', 'admin')
        addContent('td.PriceBand.Info', 'Price Band', 'admin')
        addContent('th.TicketType', 'Ticket Type', 'admin')
        addContent('td.TicketType', 'Ticket Price; service charge language hidable in Settings > System Setup > Price Lists > Do not itemize commission', 'conditional')
    } else if (iframeString === 'edittickets') {
            
        // EditTickets.aspx
        addContent('h1.EditTicketsHeading', 'Pulls from Name, Date, and Time of Instance', 'admin')
        addContent('h2.EditTicketsHeading', 'Pulls from Venue Name and Address for specific Seating Plan', 'admin')
        addContent('p.Message', 'Default messaging', 'uneditable')
        addContent('#ctl00_ContentPlaceHolder_EditTicketsWikiTextViewer', 'Optional message that will appear universally on all Events; edited in Settings > System Config > Custom Website Messages > Custom message for EventDetails.aspx', 'editable')
        addContent('#ctl00_ContentPlaceHolder_ChangeMySeatsLink', 'Default messaging - this is a link that takes you to chooseseats.aspx', 'uneditable')
        addContent('.Area.Column', 'Area name of selected ticket. Editable in Admin > Seating Plan', 'admin')
        addContent('.SeatName.Column', 'Seat row and number', 'uneditable')
        addContent('.Type.Column', 'Ticket Types available, editable in Admin > Pricing > Ticket Types', 'admin')
    } else if (iframeString === 'basket2') {
            
        // Basket2.aspx
        addContent('h1.BasketHeading', 'Default messaging, will change according to culture segment', 'argument')
        addContent('#ctl00_ContentPlaceHolder_BasketOwnerWikiText', 'Optional messaging that will appear if user is logged in; edited in Settings > System Config > Custom Website Messages > This will appear on Basket2.aspx to indicate who the order is for. Use {0} to indicate the order owner\'s name.', 'editable')
        addContent('div#ctl00_ContentPlaceHolder_DiscountsPanel', 'Savings panel, entire panel will appear only if there is at least one offer set up on the system', 'conditional')
        addContent('#ctl00_ContentPlaceHolder_RelatedOffersControl_LoginForDiscounts', 'Default messaging', 'uneditable')
        addContent('.Container.PromoCode', 'Default messaging, will appear only if at least one promo code is set up on the system', 'conditional')
        addContent('#ctl00_ContentPlaceHolder_ItemsPanel', 'Default messaging', 'uneditable')
        addContent('.Promo', 'Default messaging; appears only if Events or Merchandise have been selected as Recommended or Related', 'conditional')
        addContent('#ctl00_ContentPlaceHolder_OptionalMessagePanel', 'Optional message, edited in Settings > Configuration > System Setup > Custom Website Messages > Custom message for basket.aspx', 'editable')
        addContent('#ctl00_ContentPlaceHolder_WhatsOnLink', 'Only appears if a link has been added in Web Admin > Domain Specific Config > [select domain] > Basket "Book more tickets" Link', 'conditional')
    } else if (iframeString === 'memberships') {
        //Memberships

        addContent('#ctl00_ContentPlaceHolder_HeaderWikiText', 'Optional message, edited in Settings > Configuration > System Setup > Memberships on Web > Custom message for memberships.aspx', 'editable')
        addContent('.LoginForRenewalMessage', 'Default messaging', 'uneditable')
        addContent('.Membership > .WikiText > div', 'Pulls from Website Content for specific membership', 'admin')
        addContent('.Details > ul', 'Pulls from setup for specific Fund', 'admin')
        addContent('.AutoRenew', 'Pulls from setup for specific Fund', 'admin')
        addContent('input[type="submit"]', 'Default buttons', 'uneditable')
    } else if (iframeString === 'merchandise') {
        // Merchandise

        addContent('#ctl00_ContentPlaceHolder_HeaderWikiTextViewer', 'Optional message, edited in Settings > Configuration > System Setup > Custom message about merchandise', 'editable')
        addContent('.WikiText', 'Pulls from Website Content for specific Merchandise item', 'admin')
        addContent('p.Footer', 'Pulls from Price of specific Merchandise item', 'admin')

    } else if (iframeString === 'fixedseries'){
        if (fixedSeriesString === 'chooseseries') {

            // Choose FS

            addContent('.IconContainer', 'Pulls from Image for specific Fixed Series', 'admin')
            addContent('.SeriesName', 'Pull from Name of specific Fixed Series', 'admin')
            addContent('.SeriesTime', 'Pulls from range of dates for Insances of specific Fixed Series', 'admin')
            addContent('.BookSeriesLink', 'Default messaging', 'uneditable')

        } else if  (fixedSeriesString === 'eventsandpricing') {

            // Page 1:  Choose Events, Pricing, Number of Packages
            addContent('.ChooseEvents', 'Default messaging', 'uneditable')
            addContent('.FixedSeriesEventsList', 'Pulls from selected Events for specific Fixed Series', 'admin')
            addContent('.Button', 'Default messaging', 'uneditable')
            addContent('.ChoosePricing', 'Default messaging', 'uneditable')
            addContent('.ChoosePricingButtons', 'Pulls from names of Subscription Pricing Sets for specific Fixed Series', 'admin')
            addContent('.ChooseNumberOfTickets + h2', 'Default messaging', 'uneditable')
            addContent('label[for="ctl00_ContentPlaceHolder_EventsAndPricingControl_PackageCountBox"]', 'Default messaging', 'uneditable')

            // Page 2: Choose Sub Group
            addContent('.SeriesDetails', 'Pulls from Wikitext of specific Fixed Series', 'admin')
            addContent('.SubscriptionGroupName', 'Pulls from names of Subscription Groups for specific Fixed Series', 'admin')
            addContent('.EventInstanceDates', 'Pulls from name and time of Event Instances for specific Fixed Series Subscription Group', 'admin')

            // Page 3: Choose Seat

            // Page 4: Choose Ticket Type

            addContent('.AssignSeatsDescription', 'Default messaging', 'uneditable')
            addContent('.SeatTicketTypeDropDown', 'Pulls from chosen seat and Ticket Types available for specific Fixed Series', 'admin')

        }

    } else if (iframeString === 'donations') {

        addContent('#ctl00_ContentPlaceHolder_DonationsBlurb', 'Optional message, edited in Settings > Configuration > System Setup > Donations on Web > Custom message for donations.aspx. This appears for checkout donations too.', 'editable')
        addContent('.FundHeading', 'Pulls from Name of specific Fund', 'admin')
        addContent('.FundDescription', 'Pulls from Description of specific Fund', 'admin')
        addContent('.DonationAmount', 'Pulls from Default Amount of specific Fund', 'admin')
        addContent('[cssclass="RecognitionNameContainer"]', 'Displays if turned on in Settings > Configuration > System Setup > Donations > Capture donation recognition on the website', 'conditional')
        addContent('.RecognitionNameWikiText', 'Edited in Settings > Configuration > System Setup > Custom Website Messages > Custom heading for Donation Recognition Name box. This will appear on donations.aspx if Capture Donation Recognition setting is enabled.', 'editable')
        addContent('.DonationAnonymityWikiText', 'Edited in Settings > Configuration > System Setup > Custom Website Messages > Custom message for donation anonymity checkbox. This will appear on donations.aspx if Capture Donation Recognition setting is enabled.', 'editable')
        addContent('[cssclass="AddTributeContainer"]', 'Displays if turned on in Settings > Configuration > System Setup > Donations > Capture donation tribute on the website', 'conditional')
        addContent('.CaptureTributeWikiText', 'Edited in Settings > Configuration > System Setup > Custom Website Messages > Custom message for tribute capture checkbox. This will appear on donations.aspx if Capture Donation Tribute setting is enabled.', 'editable')
        addContent('[cssclass="TributeTypeAndNameContainer"]', 'Displays if turned on in Settings > Configuration > System Setup > Donations > Capture donation tribute on the website', 'conditional')
        addContent('#ctl00_ContentPlaceHolder_Funds_ctl00_TributeTypeDropDownList', 'Editable in Settings > Configuration > System Setup > Donations > Tribute Type', 'editable')

    } else if (iframeString === 'giftvouchers') {
        addContent('.AddGiftVoucherBlurb', 'Optional message, editable in Settings > Configuration > System Setup > Custom Website Messages > Custom message to display when a Gift Voucher is added to the basket', 'editable')
        addContent('.VoucherExpiryText', 'Displays according to Settings > Configuration > System Setup > Credits & Commissions > Default Gift Voucher Expiration', 'conditional')
        addContent('#ctl00_ContentPlaceHolder_RedeemGiftLink', 'Default messaging', 'uneditable')
        addContent('.Container', 'Default messaging', 'uneditable')
        addContent('.Comment.AddAnotherVoucherText', 'Default messaging', 'uneditable')

    }