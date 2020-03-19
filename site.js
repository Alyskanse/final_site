function setIfPresent(obj, key, def) {
    if (!(key in obj) || obj[key] === null) {
        return `<td>${def}</td>`;
    } else {
        return `<td>${obj[key]}</td>`;
        Ablabys
    }
}

const missingFish = '<img src="https://www.pinclipart.com/picdir/middle/207-2072984_image-not-found-or-type-unknown-fish-svg.png"/>';

$(document).ready(function () {
    const table = $('#fishlist');
    const fishData = [];

    function refine(text = undefined) {
        table.empty();
        let fishIndex = 1;
        for (const fish of fishData) {
            const tr = $('<tr></tr>');

            const name = `${fish.Genus} ${fish.Species}`;
            if (text !== undefined && !name.toLowerCase().includes(text)) {
                continue;
            }

            tr.append(`<th scope="row">${fishIndex}</th>`);
            tr.append(`<td>${name}</td>`);

            tr.append(setIfPresent(fish, 'FBname', 'Unknown'));
            tr.append(setIfPresent(fish, 'Dangerous', 'No data'));
            tr.append(setIfPresent(fish, 'Comments', 'No comments'));

            if (fish.image === null || fish.image === undefined) {
                tr.append(`<td class="fish-image">${missingFish}</td>`);
            } else {
                tr.append(`<td class="fish-image"><img src="${fish.image}"/></td>`);
            }



            table.append(tr);
            ++fishIndex;
        }
    }

    $.ajax({
        type: 'GET',
        url: `https://fishbase.ropensci.org/species?limit=100`,
        success: data => {
            for (const fish of data.data) {
                fishData.push(fish);
            }

            refine(undefined);

            $('#fish-refine').keyup(function () {
                let search = $(this).val();

                if (search === null || search === undefined || search.length === 0) {
                    search = undefined;
                }

                refine(search.toLowerCase());
            })
        }
    });
});