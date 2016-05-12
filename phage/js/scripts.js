$(document).ready(function () {
    // Best Score click handlers
    $('#bs-no').click(function () {
        if ($('#bs-no').is(':checked')) {
            $('#show-this-if-bs-no').show();
        }
    });
    $('#bs-yes').click(function () {
        if ($('#bs-yes').is(':checked')) {
            $('#show-this-if-bs-no').hide();
        }
    });
    $('#bs-select').change(function () {
        if ($('#bs-select option').filter(':selected').val() == "I would like to write my own reason") {
            $("#show-bs-reason").show();
        } else {
            $("#show-bs-reason").hide();
        }
    });
    // Longest ORF click handlers
    $('#lo-no').click(function () {
        if ($('#lo-no').is(':checked')) {
            $('#show-this-if-lo-no').show();
        }
    });
    $('#lo-yes').click(function () {
        if ($('#lo-yes').is(':checked')) {
            $('#show-this-if-lo-no').hide();
        }
    });
    $('#lo-select').change(function () {
        if ($('#lo-select option').filter(':selected').val() == "I would like to write my own reason") {
            $("#show-lo-reason").show();
        } else {
            $("#show-lo-reason").hide();
        }
    });
    // Function Click Handlers
    $('#nkf-no').click(function () {
        if ($('#nkf-no').is(':checked')) {
            $('#show-this-if-nkf-no').show();
            $('#show-this-if-nkf-yes').hide();
        }
    });
    $('#nkf-yes').click(function () {
        if ($('#nkf-yes').is(':checked')) {
            $('#show-this-if-nkf-yes').show();
            $('#show-this-if-nkf-no').hide()
        }
    });
    $('#hhpred-yes').click(function () {
        if ($('#hhpred-yes').is(':checked')) {
            $('#hhpred-div-yes').show();
        } else {
            $('#hhpred-div-yes').hide();
        }
    });
    $('#hhpred-no').click(function () {
        if ($('#hhpred-no').is(':checked')) {
            $('#hhpred-div-yes').hide();
        } else {
            $('#hhpred-div-yes').show();
        }
    });
    // compile all the answers together
    $('#submit-button').click(function () {
        //ssc and gap
        var total;
        var prev_start = $('#previous-start').val();
        var start = $('#start').val();
        var stop = $('#stop').val();
        total = "SSC: Start " + start + " Stop " + stop;
        if (start > stop) {
            total = total + " (REV) ";
        } else {
            total = total + " (FWD) ";
        }
        console.log(total);
        //coding potential
        var cp = $('#cp-selected option').filter(':selected').val();
        total = total + "CP: " + cp + " ";
        console.log(total);
        //scores
        var zvalue = $('#z-value').val();
        var finalscore = $('#final-score').val();
        //best score?
        var bs;
        if ($('#bs-yes').is(':checked')) {
            bs = "Best Score";
        } else {
            if ($('#bs-select option').filter(':selected').val() == "I would like to write my own reason") {
                bs = $('#bs-reason').val();
            } else {
                bs = "not best score but ";
                bs = bs + $('#bs-select option').filter(':selected').val();
            }
        }
        total = total + "SD: z-value " + zvalue + " final-score " + finalscore + ", " + bs + " ";
        console.log(total);
        //scs
        var scs = $('#scs-selected option').filter(':selected').val();
        total = total + "SCS: " + scs + " ";
        //gap calculation
        var gap;
        if (start > stop) {
            //next gene, rev
            if (prev_start > start) {
                // gap
                gap = (prev_start - start - 1) + "bp gap with next gene";
            } else {
                // overlap
                gap = (start - prev_start + 1) + "bp overlap with next gene";
            }
        } else {
            //previous gene, fwd
            if (prev_start > start) {
                gap = (prev_start - start + 1) + "bp overlap with previous gene"
            } else {
                gap = (start -prev_start - 1) + "bp gap with previous gene";
            }
        }
        total = total + "Gap: " + gap + " ";
        //blast
        var blastgene = $('#blast-gene-name').val();
        var blastphage = $('#blast-phage-name').val();
        var queryalignment = $('#your-AA-alignment').val();
        var otheralignment = $('#other-AA-alignment').val();
        total = total + "BLAST: " + blastgene + " from mycobacterium phage " + blastphage + "; " + blastgene + " aa " + otheralignment + " algins with query aa " + queryalignment + " ";
        console.log(total);
        //Longest ORF
        var orflength = $('#orf-length').val();
        var lo;
        if ($('#lo-yes').is(':checked')) {
            lo = "Longest ORF";
        } else {
            if ($('#lo-select option').filter(':selected').val() == "I would like to write my own reason") {
                lo = $('#lo-reason').val();
            } else {
                lo = "Not longest ORF but ";
                lo = lo + $('#lo-select option').filter(':selected').val();
            }
        }
        total = total + "LO: " + orflength + "bp " + lo + " ";
        var fs = "";
        var func = "";
        var hhpred = "";
        if ($('#hhpred-yes').is(':checked')) {
            var domain = $('#domain').val();
            var lphage = $('#hhpred-phage').val();
            var probability = $('#hhpred-probability').val();
            hhpred = ", Top hit " + domain + " of " + lphage + " with a probability of " + probability + "% on HHPred";
        } else {
            hhpred = ", No functional hits on HHPred with a probability greater than 80%";
        }
        // function is known
        if ($('#nkf-yes').is(':checked')) {
            func = $('#function').val();
            var tphage = $('#blastp-phage').val();
            var eval = $('#e-value').val();
            var identity = $('#identity').val();
            fs = "Match with " + func + " from mycobacterium phage " + tphage + " with an e-value = " + eval + " and identity " + identity + "% on BLASTp with GenBank" + hhpred;
            //function is not known
        } else {
            func = "NKF";
            fs = "No functional matches with an e-value greater than e-4 on BLASTp with GenBank" + hhpred;
        }
        console.log(fs);
        total = total + "F: " + func + " ";
        total = total + "FS: " + fs;
        alert(total);
    });
});