

KISP.proxy(function (data, config) {

    var type = config.type;
    var list1 = [
            {
                "account_id": "acct1539668912JUr3ZTpaLrJQWP1Fa5",
                "account_num": "SM5001880420181016134832",
                "account_name": "1539668912104(恢复账套)",
                "operator": "深圳万庆商贸有限公司",
                "server_ip": "172.18.4.68",
                "admin_name": "深圳万庆商贸有限公司",
                "admin_mobile": "13246651431",
                "del_time": "2018-10-16 14:05:21"
            },
            {
                "account_id": "acct1539669933fQlvndUCEOYvKhNwA3",
                "account_num": "SM5001880420181016140533",
                "account_name": "1539669933670(恢复账套)",
                "operator": "深圳万庆商贸有限公司",
                "server_ip": "172.18.4.68",
                "admin_name": "深圳万庆商贸有限公司",
                "admin_mobile": "13246651431",
                "del_time": "2018-10-16 14:06:11"
            },
            {
                "account_id": "acct1539669980bdZ2MCD7YdJbBmJzOg",
                "account_num": "SM5001880420181016140620",
                "account_name": "1539669980135(恢复账套)",
                "operator": "深圳万庆商贸有限公司",
                "server_ip": "172.18.4.68",
                "admin_name": "深圳万庆商贸有限公司",
                "admin_mobile": "13246651431",
                "del_time": "2018-10-16 15:10:55"
            },
            {
                "account_id": "acct1539673863YWerV3555ilyswRTdV",
                "account_num": "SM5001880420181016151103",
                "account_name": "1539673863360(恢复账套)",
                "operator": "深圳万庆商贸有限公司",
                "server_ip": "172.18.4.68",
                "admin_name": "深圳万庆商贸有限公司",
                "admin_mobile": "13246651431",
                "del_time": "2018-10-17 10:25:21"
            },
            {
                "account_id": "acct1539743133SY7piKsStxnQxymIFC",
                "account_num": "SM5001880420181017102533",
                "account_name": "1539743133399(恢复账套)",
                "operator": "深圳万庆商贸有限公司",
                "server_ip": "172.18.4.68",
                "admin_name": "深圳万庆商贸有限公司",
                "admin_mobile": "13246651431",
                "del_time": "2018-10-18 17:42:27"
            },
            {
                "account_id": "acct15398557668iCiZsZGMGInL74Nj2",
                "account_num": "SM5001880420181018174239",
                "account_name": "gh胜多负少",
                "operator": "深圳万庆商贸有限公司",
                "server_ip": "172.18.4.68",
                "admin_name": "深圳万庆商贸有限公司",
                "admin_mobile": "13246651431",
                "del_time": "2018-10-18 17:57:08"
            },
            {
                "account_id": "acct15398567101VJW7f8JzNRGx8a7ac",
                "account_num": "SM5001880420181018175827",
                "account_name": "gh打算",
                "operator": "深圳万庆商贸有限公司",
                "server_ip": "172.18.4.68",
                "admin_name": "深圳万庆商贸有限公司",
                "admin_mobile": "13246651431",
                "del_time": "2018-10-19 17:15:50"
            },
            {
                "account_id": "acct1545373176JjGVZfNrQcK1ezA7XE",
                "account_num": "SM500188042018122114193644",
                "account_name": "ghdsf",
                "operator": "深圳万庆商贸有限公司",
                "server_ip": "172.18.8.199",
                "admin_name": "深圳万庆商贸有限公司",
                "admin_mobile": "13246651431",
                "del_time": "2018-12-21 14:35:18"
            },
            {
                "account_id": "acct1539419219rfazi62rQ4bLEdyJZa",
                "account_num": "SM5001880420181013162655",
                "account_name": "gh",
                "operator": "深圳万庆商贸有限公司",
                "server_ip": "172.18.8.199",
                "admin_name": "深圳万庆商贸有限公司",
                "admin_mobile": "13246651431",
                "del_time": "2018-12-31 16:44:03"
            },
            {
                "account_id": "acct1546246243UP5EZzTBJ4ss7bPrK0",
                "account_num": "SM500188042018123116504331",
                "account_name": "ghgdfg",
                "operator": "深圳万庆商贸有限公司",
                "server_ip": "172.18.8.199",
                "admin_name": "深圳万庆商贸有限公司",
                "admin_mobile": "13246651431",
                "del_time": "2018-12-31 16:51:36"
            },
            {
                "account_id": "acct1546246354HeTVtcykG3uAidnaZN",
                "account_num": "SM500188042018123116523459",
                "account_name": "ghfa",
                "operator": "深圳万庆商贸有限公司",
                "server_ip": "172.18.8.199",
                "admin_name": "深圳万庆商贸有限公司",
                "admin_mobile": "13246651431",
                "del_time": "2018-12-31 16:52:49"
            },
            {
                "account_id": "acct1546246427uZUsd18uduEgNEFeq3",
                "account_num": "SM500188042018123116534761",
                "account_name": "gha",
                "operator": "深圳万庆商贸有限公司",
                "server_ip": "172.18.8.199",
                "admin_name": "深圳万庆商贸有限公司",
                "admin_mobile": "13246651431",
                "del_time": "2018-12-31 16:54:02"
            },
            {
                "account_id": "acct1546246454aTxoeEPt8Hd6gGRWbw",
                "account_num": "SM500188042018123116541458",
                "account_name": "ghfsd",
                "operator": "深圳万庆商贸有限公司",
                "server_ip": "172.18.8.199",
                "admin_name": "深圳万庆商贸有限公司",
                "admin_mobile": "13246651431",
                "del_time": "2018-12-31 16:54:30"
            },
            {
                "account_id": "acct1546246486cle2gJ9W0S4wlSlaHA",
                "account_num": "SM500188042018123116544628",
                "account_name": "ghdas",
                "operator": "深圳万庆商贸有限公司",
                "server_ip": "172.18.8.199",
                "admin_name": "深圳万庆商贸有限公司",
                "admin_mobile": "13246651431",
                "del_time": "2018-12-31 16:54:58"
            },
            {
                "account_id": "acct1546247073xjYKydPvsiGR5whqBU",
                "account_num": "SM500188042018123117043324",
                "account_name": "ghsdf",
                "operator": "深圳万庆商贸有限公司",
                "server_ip": "172.18.8.199",
                "admin_name": "深圳万庆商贸有限公司",
                "admin_mobile": "13246651431",
                "del_time": "2018-12-31 17:04:46"
            },
            {
                "account_id": "acct1546247121Up4Eq9C4NaJeg1GC95",
                "account_num": "SM500188042018123117052181",
                "account_name": "ghdfs",
                "operator": "深圳万庆商贸有限公司",
                "server_ip": "172.18.8.199",
                "admin_name": "深圳万庆商贸有限公司",
                "admin_mobile": "13246651431",
                "del_time": "2018-12-31 17:05:39"
            },
            {
                "account_id": "acct1548657080zmXtMxk7mpR6hpQ66S",
                "account_num": "UE500188042019012814312091",
                "account_name": "gh",
                "operator": "深圳万庆商贸有限公司",
                "server_ip": "172.18.8.64",
                "admin_name": "深圳万庆商贸有限公司",
                "admin_mobile": "13246651431",
                "del_time": "2019-06-20 10:11:51"
            },
            {
                "account_id": "acct154624747968RMFjEQsaWiPyvKy0",
                "account_num": "SM500188042018123117111941",
                "account_name": "ghgfds",
                "operator": "深圳万庆商贸有限公司",
                "server_ip": "172.18.8.64",
                "admin_name": "深圳万庆商贸有限公司",
                "admin_mobile": "13246651431",
                "del_time": "2019-09-30 10:16:30"
            },
            {
                "account_id": "acct15476115658WmyDBgP6ESEa6vMIn",
                "account_num": "SM500188042019011612060534",
                "account_name": "f",
                "operator": "深圳万庆商贸有限公司",
                "server_ip": "172.18.8.64",
                "admin_name": "深圳万庆商贸有限公司",
                "admin_mobile": "13246651431",
                "del_time": "2019-09-30 10:24:12"
            }
    ];
    var list2 = [
        {
            "account_id": "acct1539669807tSNtujkUNSOxNS74qG",
            "account_num": "SM5001880420181016140322",
            "account_name": "ghrwe",
            "operator": "深圳万庆商贸有限公司",
            "server_ip": "172.18.8.199",
            "admin_name": "深圳万庆商贸有限公司",
            "admin_mobile": "13246651431",
            "del_time": "2018-12-27 16:03:04"
        },
        {
            "account_id": "acct1539669807tSNtujkUNSOxNS74qG",
            "account_num": "SM5001880420181016140322",
            "account_name": "ghrwe",
            "operator": "深圳万庆商贸有限公司",
            "server_ip": "172.18.4.68",
            "admin_name": "深圳万庆商贸有限公司",
            "admin_mobile": "13246651431",
            "del_time": "2018-12-27 16:04:33"
        },
        {
            "account_id": "acct1539419219rfazi62rQ4bLEdyJZa",
            "account_num": "SM5001880420181013162655",
            "account_name": "gh",
            "operator": "深圳万庆商贸有限公司",
            "server_ip": "172.18.4.68",
            "admin_name": "深圳万庆商贸有限公司",
            "admin_mobile": "13246651431",
            "del_time": "2018-12-27 16:04:57"
        },
        {
            "account_id": "0",
            "account_num": "",
            "account_name": "ghrwe(cloud)_20181017010404886",
            "operator": "深圳万庆商贸有限公司",
            "server_ip": "",
            "admin_name": "深圳万庆商贸有限公司",
            "admin_mobile": "13246651431",
            "del_time": "2018-12-31 16:43:32"
        },
        {
            "account_id": "acct1539669807tSNtujkUNSOxNS74qG",
            "account_num": "SM5001880420181016140322",
            "account_name": "ghrwe",
            "operator": "深圳万庆商贸有限公司",
            "server_ip": "172.18.8.199",
            "admin_name": "深圳万庆商贸有限公司",
            "admin_mobile": "13246651431",
            "del_time": "2019-01-07 09:49:15"
        },
        {
            "account_id": "acct1540259841wN4DfBZkpxrokqwSDe",
            "account_num": "PRO5001880420181023095711",
            "account_name": "gh让人",
            "operator": "深圳万庆商贸有限公司",
            "server_ip": "172.18.8.199",
            "admin_name": "深圳万庆商贸有限公司",
            "admin_mobile": "13246651431",
            "del_time": "2019-01-07 10:28:18"
        },
        {
            "account_id": "acct1540259841wN4DfBZkpxrokqwSDe",
            "account_num": "PRO5001880420181023095711",
            "account_name": "gh让人",
            "operator": "深圳万庆商贸有限公司",
            "server_ip": "172.18.8.199",
            "admin_name": "深圳万庆商贸有限公司",
            "admin_mobile": "13246651431",
            "del_time": "2019-01-07 10:40:05"
        },
        {
            "account_id": "acct1539572079gGSxw6N3Q5WuaG2r1Y",
            "account_num": "PRO5001880420181015105430",
            "account_name": "gh",
            "operator": "深圳万庆商贸有限公司",
            "server_ip": "172.18.8.199",
            "admin_name": "深圳万庆商贸有限公司",
            "admin_mobile": "13246651431",
            "del_time": "2019-01-07 10:52:28"
        },
        {
            "account_id": "acct1539572079gGSxw6N3Q5WuaG2r1Y",
            "account_num": "PRO5001880420181015105430",
            "account_name": "gh",
            "operator": "深圳万庆商贸有限公司",
            "server_ip": "172.18.8.199",
            "admin_name": "深圳万庆商贸有限公司",
            "admin_mobile": "13246651431",
            "del_time": "2019-01-07 10:56:36"
        },
        {
            "account_id": "acct1539572079gGSxw6N3Q5WuaG2r1Y",
            "account_num": "PRO5001880420181015105430",
            "account_name": "gh",
            "operator": "深圳万庆商贸有限公司",
            "server_ip": "172.18.8.199",
            "admin_name": "深圳万庆商贸有限公司",
            "admin_mobile": "13246651431",
            "del_time": "2019-01-07 10:59:20"
        },
        {
            "account_id": "acct1539572079gGSxw6N3Q5WuaG2r1Y",
            "account_num": "PRO5001880420181015105430",
            "account_name": "gh",
            "operator": "深圳万庆商贸有限公司",
            "server_ip": "172.18.8.199",
            "admin_name": "深圳万庆商贸有限公司",
            "admin_mobile": "13246651431",
            "del_time": "2019-01-07 11:00:14"
        },
        {
            "account_id": "acct1539572079gGSxw6N3Q5WuaG2r1Y",
            "account_num": "PRO5001880420181015105430",
            "account_name": "gh",
            "operator": "深圳万庆商贸有限公司",
            "server_ip": "172.18.8.199",
            "admin_name": "深圳万庆商贸有限公司",
            "admin_mobile": "13246651431",
            "del_time": "2019-01-07 11:03:44"
        }
    ];

    var list = type == 1 ? list1 : list2;


    return {
        "msg": "success",
        "code": "200",
        "state": "62592400EE09FA43",
        "data": list,
    };
});