import React from 'react'
import config from '../../config/config'

function HowWeWork({dynamicText, dynamicImages}) {
  return (
    <>
        <div className='flex-col container mx-auto'>
            <div className='flex justify-center items-center p-5  gap-2 container mx-auto w-full'>
                <div className='text-center lg:text-left max-w-4xl'>
                <div className='flex justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="168" height="168" viewBox="0 0 168 168" fill="none">
                        <path d="M77.5657 125.738C77.8651 125.737 78.1598 125.664 78.424 125.523C78.6883 125.382 78.9139 125.179 79.0813 124.93C79.2487 124.682 79.3526 124.397 79.384 124.099C79.4154 123.801 79.3734 123.501 79.2615 123.223L66.4243 91.4171C66.2426 90.9672 65.8897 90.6078 65.4432 90.4181C64.9966 90.2284 64.493 90.2238 64.043 90.4055C63.5931 90.5871 63.2338 90.94 63.0441 91.3866C62.8544 91.8331 62.8498 92.3368 63.0314 92.7867L75.869 124.592C76.0054 124.931 76.2398 125.22 76.5421 125.424C76.8445 125.629 77.2009 125.738 77.5657 125.738Z" fill="#b89b27"/>
                        <path d="M69.708 137.76C69.4468 138.449 69.3248 139.183 69.3492 139.919C69.3736 140.656 69.5438 141.38 69.8501 142.05L71.5071 145.704C72.0921 146.993 73.1434 148.014 74.4499 148.561C75.7563 149.108 77.2213 149.14 78.5506 148.651L80.4757 152.917C81.1417 154.377 82.2136 155.614 83.5634 156.48C84.9133 157.347 86.484 157.808 88.0882 157.806C89.2067 157.807 90.3135 157.579 91.3406 157.136C93.3044 156.293 94.8679 154.726 95.7058 152.76C96.5438 150.795 96.5918 148.582 95.8399 146.581L75.3845 91.9783C75.3016 91.7516 75.1745 91.5436 75.0108 91.3662C74.847 91.1888 74.6497 91.0455 74.4304 90.9447C74.211 90.8439 73.9738 90.7875 73.7325 90.7788C73.4913 90.77 73.2506 90.8091 73.0246 90.8938C72.7985 90.9785 72.5914 91.1071 72.4152 91.2722C72.2391 91.4373 72.0973 91.6357 71.9982 91.8558C71.899 92.076 71.8444 92.3135 71.8375 92.5549C71.8306 92.7962 71.8715 93.0365 71.9579 93.262L92.4142 147.865C92.8371 148.996 92.8037 150.247 92.3212 151.355C91.8387 152.462 90.9447 153.338 89.8281 153.799C88.7115 154.259 87.4597 154.268 86.3369 153.823C85.2142 153.377 84.3084 152.513 83.8108 151.413L81.1379 145.491C81.0389 145.271 80.8976 145.074 80.7221 144.909C80.5467 144.745 80.3405 144.616 80.1154 144.532C79.8904 144.447 79.6507 144.407 79.4103 144.415C79.1699 144.423 78.9334 144.478 78.7144 144.577L77.4206 145.164C76.9496 145.378 76.413 145.396 75.9289 145.214C75.4449 145.032 75.0529 144.665 74.8392 144.194L73.1822 140.541C73.0764 140.307 73.0176 140.055 73.0092 139.799C73.0008 139.544 73.0429 139.288 73.1331 139.049C73.2234 138.809 73.3599 138.589 73.5351 138.403C73.7102 138.216 73.9204 138.065 74.1537 137.959L75.4662 137.363C75.9075 137.163 76.2513 136.796 76.4222 136.342C76.5932 135.889 76.5773 135.386 76.3781 134.944L72.3596 126.038C72.2606 125.819 72.1194 125.621 71.944 125.456C71.7686 125.292 71.5624 125.163 71.3373 125.079C71.1121 124.994 70.8725 124.954 70.632 124.962C70.3916 124.97 70.1551 125.025 69.936 125.125L68.6045 125.729C68.1333 125.941 67.597 125.959 67.1131 125.777C66.6292 125.595 66.2372 125.228 66.0231 124.758L64.3661 121.104C64.1526 120.633 64.1349 120.097 64.3169 119.613C64.499 119.129 64.8658 118.737 65.3367 118.523L66.6882 117.91C67.1298 117.71 67.4739 117.343 67.645 116.89C67.8161 116.436 67.8002 115.934 67.6008 115.492L64.2683 108.106C64.0747 107.678 63.7239 107.341 63.2883 107.164C62.8528 106.987 62.3661 106.985 61.9288 107.157L60.0283 107.907C59.5471 108.097 59.0103 108.088 58.5359 107.882C58.0615 107.676 57.6882 107.29 57.4981 106.809L56.0255 103.078C55.9315 102.84 55.8853 102.586 55.8896 102.33C55.8939 102.074 55.9486 101.821 56.0506 101.586C56.1526 101.351 56.2999 101.139 56.484 100.961C56.6681 100.783 56.8855 100.643 57.1237 100.549L58.5084 100.002C58.7387 99.9109 58.9481 99.7741 59.1239 99.5998C59.2998 99.4255 59.4385 99.2173 59.5316 98.9879C59.6247 98.7585 59.6702 98.5125 59.6656 98.265C59.6609 98.0174 59.606 97.7734 59.5043 97.5476L57.7406 93.6383C57.5823 93.2853 57.3157 92.9917 56.9794 92.8002C56.6432 92.6088 56.2547 92.5293 55.8703 92.5732C49.8752 93.2381 43.824 91.9809 38.5899 88.9831C33.3558 85.9852 29.2097 81.4017 26.75 75.8942C24.2903 70.3867 23.6442 64.2401 24.905 58.3415C26.1657 52.443 29.2682 47.0976 33.7645 43.0769C33.9466 42.9176 34.0953 42.7238 34.202 42.5067C34.3087 42.2896 34.3713 42.0534 34.3861 41.812C34.4009 41.5705 34.3677 41.3285 34.2884 41.0999C34.209 40.8714 34.0851 40.6609 33.9239 40.4805C33.7626 40.3002 33.5672 40.1536 33.3489 40.0493C33.1306 39.945 32.8938 39.8851 32.6522 39.8729C32.4105 39.8608 32.1689 39.8967 31.9412 39.9785C31.7136 40.0604 31.5044 40.1866 31.3259 40.3498C26.3304 44.8087 22.8541 50.7178 21.3835 57.2503C19.9129 63.7828 20.5216 70.6116 23.1244 76.7809C25.7272 82.9503 30.1939 88.1515 35.8992 91.6564C41.6046 95.1614 48.263 96.7948 54.9427 96.328L55.388 97.315C54.1173 97.9333 53.1268 99.0084 52.6143 100.325C52.1018 101.642 52.1051 103.104 52.6235 104.419L54.0961 108.15C54.6438 109.533 55.7174 110.641 57.0816 111.234C58.4458 111.826 59.989 111.852 61.373 111.308L61.6519 111.198L63.5202 115.339C62.258 116.007 61.2983 117.132 60.8366 118.484C60.375 119.835 60.4461 121.312 61.0356 122.613L62.693 126.266C63.2807 127.562 64.3394 128.587 65.6543 129.132C66.9693 129.677 68.4422 129.701 69.7746 129.2L72.2985 134.794C71.1025 135.434 70.1814 136.489 69.708 137.76Z" fill="#b89b27"/>
                        <path d="M101.71 66.1416C101.43 66.5381 101.32 67.0294 101.402 67.5075C101.485 67.9856 101.754 68.4114 102.15 68.6911L147.833 100.911C148.818 101.608 149.495 102.661 149.719 103.848C149.943 105.034 149.697 106.261 149.034 107.27C148.371 108.279 147.342 108.991 146.164 109.255C144.985 109.52 143.751 109.316 142.72 108.688L137.174 105.297C136.969 105.172 136.741 105.088 136.504 105.051C136.266 105.014 136.024 105.024 135.79 105.08C135.556 105.137 135.336 105.239 135.142 105.381C134.947 105.522 134.783 105.701 134.658 105.906L133.918 107.12C133.649 107.562 133.216 107.879 132.713 108.001C132.211 108.123 131.68 108.04 131.239 107.771L127.812 105.685C127.371 105.416 127.054 104.982 126.932 104.48C126.81 103.978 126.893 103.447 127.161 103.005L127.912 101.773C128.164 101.359 128.241 100.862 128.127 100.391C128.013 99.9199 127.717 99.5134 127.303 99.2606L118.969 94.1628C118.764 94.0374 118.536 93.9536 118.298 93.9164C118.061 93.8791 117.818 93.889 117.585 93.9455C117.351 94.0021 117.13 94.1042 116.936 94.246C116.742 94.3878 116.578 94.5665 116.452 94.7718L115.691 96.0207C115.422 96.4624 114.989 96.7792 114.486 96.9014C113.984 97.0236 113.453 96.9412 113.012 96.6723L109.586 94.5861C109.144 94.3166 108.828 93.8831 108.706 93.3806C108.584 92.8781 108.666 92.3477 108.934 91.9056L109.706 90.6381C109.958 90.2243 110.036 89.7273 109.922 89.2564C109.808 88.7854 109.511 88.3788 109.098 88.126L102.186 83.8987C101.785 83.6535 101.305 83.572 100.846 83.6712C100.386 83.7703 99.9826 84.0425 99.7184 84.4313L98.5699 86.1215C98.2789 86.5489 97.8303 86.8434 97.3224 86.9403C96.8145 87.0373 96.2889 86.9287 95.8609 86.6386L92.5433 84.384C92.116 84.093 91.8216 83.6444 91.7247 83.1366C91.6279 82.6288 91.7364 82.1033 92.0265 81.6754L92.8632 80.4439C93.0024 80.2392 93.0985 80.0083 93.1459 79.7653C93.1932 79.5223 93.1907 79.2722 93.1386 79.0302C93.0864 78.7882 92.9857 78.5592 92.8425 78.3573C92.6992 78.1554 92.5165 77.9846 92.3054 77.8553L88.6468 75.6179C88.3167 75.4159 87.931 75.3239 87.5453 75.355C87.1596 75.386 86.7937 75.5386 86.5002 75.7908C83.5347 78.3357 80.0767 80.2423 76.3418 81.3918C72.6069 82.5412 68.6752 82.9088 64.792 82.4716C60.9088 82.0345 57.1573 80.8019 53.7714 78.8508C50.3856 76.8997 47.4381 74.2719 45.1127 71.1313C42.7873 67.9907 41.134 64.4047 40.2557 60.5969C39.3775 56.7891 39.2932 52.8412 40.0081 48.9994C40.7231 45.1576 42.2219 41.5043 44.4111 38.2673C46.6003 35.0303 49.433 32.2792 52.7325 30.1853C52.9366 30.0571 53.1134 29.8897 53.2526 29.6929C53.3919 29.4961 53.4908 29.2737 53.5438 29.0386C53.5968 28.8034 53.6028 28.5601 53.5614 28.3226C53.5201 28.0851 53.4322 27.8581 53.3028 27.6547C53.1734 27.4512 53.0051 27.2754 52.8075 27.1373C52.61 26.9991 52.387 26.9014 52.1516 26.8497C51.9161 26.798 51.6727 26.7933 51.4355 26.836C51.1982 26.8787 50.9717 26.9678 50.769 27.0983C47.0899 29.4301 43.9236 32.486 41.463 36.0803C39.0025 39.6745 37.299 43.7319 36.4562 48.0054C35.6135 52.2789 35.6492 56.6792 36.5611 60.9385C37.4729 65.1978 39.242 69.227 41.7605 72.7809C44.279 76.3348 47.4943 79.3391 51.2108 81.6108C54.9273 83.8826 59.0671 85.3744 63.3784 85.9955C67.6897 86.6165 72.0823 86.3538 76.2889 85.2233C80.4954 84.0927 84.428 82.1181 87.8471 79.4195L88.7708 79.9842C88.069 81.2106 87.8558 82.6567 88.1737 84.0335C88.4917 85.4103 89.3174 86.6165 90.4859 87.411L93.8036 89.6659C95.0347 90.5 96.5463 90.8119 98.007 90.5331C99.4677 90.2544 100.758 89.4077 101.596 88.1788L101.764 87.9304L105.639 90.3008C104.974 91.5642 104.815 93.0337 105.194 94.4103C105.574 95.7869 106.463 96.9673 107.682 97.7115L111.108 99.798C112.324 100.538 113.776 100.788 115.169 100.498C116.563 100.208 117.794 99.3987 118.613 98.2348L123.848 101.437C123.194 102.699 123.043 104.162 123.425 105.53C123.808 106.899 124.696 108.071 125.91 108.811L129.336 110.897C130.546 111.633 131.989 111.885 133.377 111.601C134.764 111.318 135.993 110.52 136.817 109.368L140.81 111.809C142.106 112.603 143.597 113.021 145.117 113.019C146.886 113.029 148.611 112.473 150.042 111.434C151.473 110.395 152.535 108.926 153.073 107.241C153.611 105.557 153.597 103.744 153.034 102.068C152.471 100.392 151.387 98.9388 149.941 97.9212L104.259 65.7013C104.063 65.5627 103.841 65.4641 103.607 65.4112C103.373 65.3583 103.13 65.3522 102.893 65.3931C102.656 65.434 102.43 65.5211 102.227 65.6496C102.024 65.778 101.848 65.9452 101.71 66.1416Z" fill="#b89b27"/>
                        <path d="M21.9048 48.74C22.0965 48.5952 22.2578 48.414 22.3794 48.2068C22.501 47.9997 22.5806 47.7705 22.6137 47.5326C22.6467 47.2946 22.6325 47.0525 22.5719 46.82C22.5113 46.5875 22.4055 46.3692 22.2605 46.1777C20.3336 43.6242 19.0417 40.6491 18.4913 37.4979C17.9409 34.3467 18.1477 31.1098 19.0948 28.0543C20.0419 24.9988 21.7021 22.2124 23.9383 19.9249C26.1745 17.6375 28.9226 15.9147 31.9559 14.8986C34.9891 13.8826 38.2205 13.6025 41.3834 14.0814C44.5462 14.5603 47.5498 15.7845 50.1463 17.6531C52.7428 19.5216 54.8577 21.9808 56.3164 24.8277C57.7752 27.6746 58.536 30.8277 58.536 34.0266C58.535 35.0422 58.4577 36.0563 58.3047 37.0604C55.3419 37.1036 52.4856 38.1724 50.2222 40.0846C47.9587 41.9969 46.4279 44.6345 45.8903 47.5484C45.3528 50.4624 45.8418 53.4726 47.274 56.0666C48.7062 58.6606 50.9932 60.678 53.7455 61.7755C56.4979 62.8731 59.5456 62.9828 62.3697 62.086C65.1939 61.1892 67.62 59.3414 69.235 56.8571C70.85 54.3728 71.5542 51.4056 71.2275 48.4605C70.9009 45.5155 69.5637 42.7746 67.4436 40.7046C67.0966 40.3655 66.629 40.1782 66.1439 40.1839C65.6587 40.1895 65.1957 40.3877 64.8567 40.7347C64.5176 41.0818 64.3303 41.5493 64.336 42.0345C64.3417 42.5196 64.5398 42.9826 64.8869 43.3217C66.3747 44.7713 67.326 46.6833 67.5848 48.7443C67.8437 50.8054 67.3947 52.8932 66.3115 54.6657C65.2283 56.4381 63.5751 57.7901 61.6228 58.4999C59.6706 59.2097 57.5352 59.2352 55.5665 58.5724C53.5979 57.9096 51.9128 56.5976 50.7874 54.8516C49.6621 53.1056 49.1632 51.0291 49.3726 48.9625C49.582 46.8958 50.4872 44.9616 51.9399 43.4768C53.3926 41.992 55.3066 41.0447 57.3682 40.7902C56.4593 43.3494 55.0417 45.6981 53.201 47.6949C53.0382 47.8716 52.9117 48.0786 52.8289 48.3042C52.7461 48.5297 52.7085 48.7693 52.7183 49.0094C52.728 49.2495 52.785 49.4853 52.8859 49.7033C52.9868 49.9214 53.1297 50.1174 53.3063 50.2802C53.483 50.4431 53.69 50.5695 53.9156 50.6523C54.1411 50.7352 54.3807 50.7728 54.6208 50.763C54.8609 50.7532 55.0967 50.6963 55.3147 50.5953C55.5328 50.4944 55.7288 50.3516 55.8916 50.1749C58.7634 47.0605 60.7522 43.2362 61.6527 39.0967C62.5533 34.9572 62.333 30.6523 61.0147 26.6264C65.8847 25.3983 70.9931 25.4813 75.8207 26.8669C80.6483 28.2525 85.0231 30.8912 88.5007 34.5151C91.9782 38.139 94.4345 42.6188 95.6201 47.4994C96.8056 52.3799 96.6781 57.4874 95.2506 62.3027C95.2483 62.3093 95.2486 62.3162 95.2466 62.3228C94.5031 64.832 93.4147 67.2259 92.0126 69.4358C91.7566 69.8392 91.6685 70.3267 91.7671 70.7942C91.8658 71.2616 92.1434 71.672 92.5406 71.9375L121.057 90.995C121.461 91.2647 121.955 91.3632 122.431 91.2686C122.907 91.1741 123.326 90.8943 123.596 90.4908C123.866 90.0873 123.964 89.5932 123.869 89.1171C123.775 88.641 123.495 88.222 123.092 87.9523L96.0213 69.8604C97.2736 67.6213 98.2515 65.2395 98.9338 62.7664C98.9453 62.7254 98.9462 62.6843 98.9548 62.6433C100.437 57.1885 100.454 51.439 99.0025 45.9758C97.5514 40.5125 94.6842 35.529 90.6905 31.5286C86.6968 27.5282 81.7181 24.6527 76.2572 23.1924C70.7964 21.7322 65.0469 21.739 59.5896 23.2122C58.0894 20.2672 55.993 17.6665 53.4335 15.5754C50.874 13.4843 47.9075 11.9486 44.7225 11.0658C41.5375 10.1831 38.2037 9.97256 34.9329 10.4477C31.6622 10.9229 28.526 12.0733 25.7239 13.8258C22.9217 15.5784 20.5148 17.8947 18.6561 20.6276C16.7974 23.3606 15.5276 26.4503 14.9274 29.7004C14.3272 32.9505 14.4098 36.29 15.1698 39.5065C15.9298 42.723 17.3507 45.7462 19.3421 48.384C19.487 48.5757 19.6682 48.7369 19.8754 48.8585C20.0826 48.9802 20.3117 49.0598 20.5497 49.0928C20.7877 49.1259 21.0298 49.1117 21.2623 49.0512C21.4948 48.9907 21.7132 48.8849 21.9048 48.74Z" fill="#b89b27"/>
                        <path d="M103.71 11.9066L94.7909 24.5935" stroke="#b89b27" stroke-width="2" stroke-linecap="round"/>
                        <path d="M38.4098 143.955L45.5036 130.165" stroke="#b89b27" stroke-width="2" stroke-linecap="round"/>
                        <path d="M131.367 40.1823L117.552 47.2277" stroke="#b89b27" stroke-width="2" stroke-linecap="round"/>
                        <path d="M7.13342 119.742L19.8515 110.867" stroke="#b89b27" stroke-width="2" stroke-linecap="round"/>
                        <path d="M163.631 77.9007L148.183 76.5351" stroke="#b89b27" stroke-width="2" stroke-linecap="round"/>
                        <path d="M137.603 158.182L125.905 148" stroke="#b89b27" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
                <div className="text-primary text-center font-custom text-3xl capitalize pb-3">{dynamicText !==null  && dynamicText.find((text) => text.attributes.name === 'HowWeWork_Heading').attributes.text}</div>
                <div className=" w-full text-primary text-center text-md font-normal leading-normal pb-5">{dynamicText !==null  && dynamicText.find((text) => text.attributes.name === 'HowWeWork_Subheading').attributes.text}</div>
                </div>
            </div>
            <div className='flex flex-col gap-10'>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div className='flex flex-col justify-center items-center gap-5 order-2 md:order-1'>
                        <div className='flex flex-row md:flex-col gap-3 justify-center items-center'>
                            <div className='border-2 border-secondary rounded-full relative h-10 w-10 md:h-20 md:w-20 drop-shadow-md flex justify-center items-center'>
                                <div className='absolute font-custom-lora-bold h-10 w-10 md:h-20 md:w-20 flex -top-[2px] -right-[1px] justify-center items-center text-xl md:text-5xl'>1</div>
                            </div>
                            <div className='flex justify-center items-center'>
                                <div className="text-secondary drop-shadow-lg text-center font-custom text-xl md:text-5xl capitalize">{dynamicText !==null  && dynamicText.find((text) => text.attributes.name === 'HowWeWork_Heading1').attributes.text}</div>
                            </div>
                        </div>
                        <div className=" w-full md:w-3/4 text-primary text-center text-md font-normal leading-normal pb-5">{dynamicText !==null  && dynamicText.find((text) => text.attributes.name === 'HowWeWork_Content1').attributes.text}</div>
                    </div>
                    <div className='flex justify-center w-full p-5 order-1 md:order-2'>
                        <img className="h-96 w-full lg:w-full rounded-md object-cover" src={`${config.STRAPI_URL}`+dynamicImages.find((image) => image.attributes.name === 'HomeOwners_HowWeWork_Image1.jpg').attributes.url} alt='Placeholder'/>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 bg-neutral-100'>
                    <div className='flex flex-col justify-center items-center gap-5 order-2'>
                        <div className='flex flex-row md:flex-col gap-3 justify-center items-center'>
                            <div className='border-2 border-secondary rounded-full relative h-10 w-10 md:h-20 md:w-20 drop-shadow-md flex justify-center items-center'>
                                <div className='absolute font-custom-lora-bold h-10 w-10 md:h-20 md:w-20 flex -top-[2px] -right-[1px] justify-center items-center text-xl md:text-5xl'>2</div>
                            </div>
                            <div className='flex justify-center items-center'>
                                <div className="text-secondary drop-shadow-lg text-center font-custom text-xl md:text-5xl capitalize">{dynamicText !==null  && dynamicText.find((text) => text.attributes.name === 'HowWeWork_Heading2').attributes.text}</div>
                            </div>
                        </div>
                        <div className=" w-full md:w-3/4 text-primary text-center text-md font-normal leading-normal pb-5">{dynamicText !==null  && dynamicText.find((text) => text.attributes.name === 'HowWeWork_Content2').attributes.text}</div>
                    </div>
                    <div className='flex justify-center w-full p-5 order-1'>
                        <img className="h-96 w-full  lg:w-full rounded-md object-cover" src={`${config.STRAPI_URL}`+dynamicImages.find((image) => image.attributes.name === 'HomeOwners_HowWeWork_Image2.jpg').attributes.url} alt='Placeholder'/>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div className='flex flex-col justify-center items-center gap-5 order-2 md:order-1'>
                        <div className='flex flex-row md:flex-col gap-3 justify-center items-center'>
                            <div className='border-2 border-secondary rounded-full relative h-10 w-10 md:h-20 md:w-20 drop-shadow-md flex justify-center items-center'>
                                <div className='absolute font-custom-lora-bold h-10 w-10 md:h-20 md:w-20 flex -top-[2px] -right-[1px] justify-center items-center text-xl md:text-5xl'>3</div>
                            </div>
                            <div className='flex justify-center items-center'>
                                <div className="text-secondary drop-shadow-lg text-center font-custom text-xl md:text-5xl capitalize">{dynamicText !==null  && dynamicText.find((text) => text.attributes.name === 'HowWeWork_Heading3').attributes.text}</div>
                            </div>
                        </div>
                        <div className=" w-full md:w-3/4 text-primary text-center text-md font-normal leading-normal pb-5">{dynamicText !==null  && dynamicText.find((text) => text.attributes.name === 'HowWeWork_Content3').attributes.text}</div>
                    </div>
                    <div className='flex justify-center w-full p-5 order-1 md:order-2'>
                        <img className="h-96 w-full lg:w-full rounded-md object-cover" src={`${config.STRAPI_URL}`+dynamicImages.find((image) => image.attributes.name === 'HomeOwners_HowWeWork_Image3.jpg').attributes.url} alt='Placeholder'/>
                    </div>
                </div>
            </div>

            <div className='flex justify-center items-center mt-10'>
                <button className='bg-primary text-white font-custom text-2xl py-3 px-10 rounded-lg hover:bg-secondary hover:text-primary transition duration-300 ease-in-out'>Get a Quote</button>
            </div>
        </div>
    </>
  )
}

export default HowWeWork