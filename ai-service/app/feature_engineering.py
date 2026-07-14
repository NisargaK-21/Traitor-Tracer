ROLE_MAP = {
    "EMPLOYEE": 0,
    "MANAGER": 1,
    "ADMIN": 2
}

COUNTRY_MAP = {
    "India": 0,
    "USA": 1,
    "UK": 2,
    "Russia": 3,
    "China": 4
}

DEVICE_MAP = {
    "Windows": 0,
    "Mac": 1,
    "Linux": 2
}


def encode_dataframe(df):

    df = df.copy()

    df["role"] = df["role"].map(ROLE_MAP)

    df["country"] = df["country"].map(COUNTRY_MAP)

    df["device"] = df["device"].map(DEVICE_MAP)

    return df[
        [
            "role",
            "hour",
            "failedLogins",
            "downloads",
            "country",
            "device",
            "vpn",
            "usbInserted",
            "adminAction",
        ]
    ]


def encode_request(req):

    return [[
        ROLE_MAP.get(req.role, 0),
        req.hour,
        req.failedLogins,
        req.downloads,
        COUNTRY_MAP.get(req.country, 0),
        DEVICE_MAP.get(req.device, 0),
        int(req.vpn),
        int(req.usbInserted),
        int(req.adminAction),
    ]]