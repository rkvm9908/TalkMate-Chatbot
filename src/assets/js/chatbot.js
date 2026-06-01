const Chatbot = {
    defaultResponses: {
        'hello': `Hello! Enna help venum?`, 'hi': `Hey! Enna help venum?`,

        'how are you': `Naan super ah irukken Nee epdi irukka?`,

        'flip a coin': function () {
            const randomNumber = Math.random();

            if (randomNumber < 0.5) {
                return 'Coin flip panniten Result: Heads!';
            } else {
                return 'Coin flip panniten Result: Tails!';
            }
        },

        'roll a dice': function () {
            const diceResult = Math.floor(Math.random() * 6) + 1;
            return `Dice roll panniten Unakku vandhadhu ${diceResult}`;
        },

        'what is the date today': function () {
            const now = new Date();

            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];

            const month = months[now.getMonth()];
            const day = now.getDate();

            return `Innaiku date ${month} ${day}`;
        },

        'thank': `Parava illa Innum help venumna kelu!`,

        'bye': `Bye bye Later pesalam!`,

        'who are you': `Naan un chatbot friend`,

        'good morning': `Good morning `,

        'good night': `Good night Nalla thungu!`
    },

    additionalResponses: {},

    unsuccessfulResponse:
        `Sorry, Enakku puriyala. 
        Itha Try pannunga: flip a coin, roll a dice, date kekkalam.`,

    emptyMessageResponse:
        `Message empty ah irukku Edhavadhu type pannitu anupu.`,

    addResponses: function (additionalResponses) {
        this.additionalResponses = {
            ...this.additionalResponses,
            ...additionalResponses
        };
    },

    getResponse: function (message) {
        if (!message) {
            return this.emptyMessageResponse;
        }

        const responses = {
            ...this.defaultResponses,
            ...this.additionalResponses
        };

        const { ratings, bestMatchIndex } =
            this.stringSimilarity(message.toLowerCase(), Object.keys(responses));

        const bestResponseRating = ratings[bestMatchIndex].rating;

        if (bestResponseRating <= 0.3) {
            return this.unsuccessfulResponse;
        }

        const bestResponseKey = ratings[bestMatchIndex].target;
        const response = responses[bestResponseKey];

        if (typeof response === 'function') {
            return response();
        } else {
            return response;
        }
    },

    getResponseAsync: function (message) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.getResponse(message));
            }, 1000);
        });
    },

    compareTwoStrings: function (first, second) {
        first = first.replace(/\s+/g, '');
        second = second.replace(/\s+/g, '');

        if (first === second) return 1;
        if (first.length < 2 || second.length < 2) return 0;

        let firstBigrams = new Map();

        for (let i = 0; i < first.length - 1; i++) {
            const bigram = first.substring(i, i + 2);

            const count = firstBigrams.has(bigram)
                ? firstBigrams.get(bigram) + 1
                : 1;

            firstBigrams.set(bigram, count);
        }

        let intersectionSize = 0;

        for (let i = 0; i < second.length - 1; i++) {
            const bigram = second.substring(i, i + 2);

            const count = firstBigrams.has(bigram)
                ? firstBigrams.get(bigram)
                : 0;

            if (count > 0) {
                firstBigrams.set(bigram, count - 1);
                intersectionSize++;
            }
        }

        return (2.0 * intersectionSize) /
            (first.length + second.length - 2);
    },

    stringSimilarity: function (mainString, targetStrings) {
        const ratings = [];
        let bestMatchIndex = 0;

        for (let i = 0; i < targetStrings.length; i++) {
            const currentTargetString = targetStrings[i];
            const currentRating =
                this.compareTwoStrings(mainString, currentTargetString);

            ratings.push({
                target: currentTargetString,
                rating: currentRating
            });

            if (currentRating > ratings[bestMatchIndex].rating) {
                bestMatchIndex = i;
            }
        }

        return {
            ratings,
            bestMatchIndex
        };
    }
};
export default Chatbot;