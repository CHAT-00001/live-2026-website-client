<script>
    import {Bell, MoreHorizontal, Plus, Search} from 'lucide-svelte';
</script>
<section>
    <div class="side min-h-screen bg-[#F4F5F7] p-6 text-slate-800 font-sans">
        <header class="flex items-center justify-between mb-8">
            <div class="flex items-center gap-8">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                        z
                    </div>
                    <span class="font-bold text-xl tracking-tight">zentra</span>
                </div>
                <nav class="flex items-center bg-gray-200/50 p-1 rounded-full">
                    <button class="px-4 py-1.5 bg-zinc-900 text-white rounded-full text-sm font-medium">Home</button>
                    <button class="px-4 py-1.5 text-gray-600 text-sm font-medium">Payments</button>
                    <button class="px-4 py-1.5 text-gray-600 text-sm font-medium">Balances</button>
                    <button class="px-4 py-1.5 text-gray-600 text-sm font-medium">Customers</button>
                </nav>
            </div>

            <div class="flex items-center gap-4">
                <Search class="text-gray-400" size={40}/>
                <div class="relative">
                    <Bell class="text-gray-400" size={40}/>
                    <span class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </div>
                <img alt="Avatar"
                     class="w-8 h-8 rounded-full border border-gray-200 w-32" src="http://cdn1.damawei.com/android_10011147_20231207_232042_1622180.jpg?imageView2/2/w/600/h/600"/>
            </div>
        </header>

        <div class="flex justify-between items-end mb-6">
            <h1 class="text-4xl font-semibold tracking-tight">Overview</h1>
            <div class="flex gap-2">
                <div class="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm shadow-sm">
                    <span class="text-gray-500 mr-2">Jan 01 - July 31</span>
                    <span class="text-gray-300 mx-2">compared to</span>
                    <span class="text-gray-500">Aug 01 - Dec 31</span>
                </div>
                <button class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm">
                    <Plus size={18}/>
                </button>
            </div>
        </div>

        <div class="grid grid-cols-12 gap-6">

            <div class="col-span-8 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                <div class="flex justify-between items-center mb-10">
                    <h3 class="text-xl font-medium">Payments</h3>
                    <button class="text-gray-400">
                        <MoreHorizontal/>
                    </button>
                </div>

                <div class="flex items-end justify-between h-48 gap-4 mb-8">
                    <div class="flex-1 flex flex-col items-center">
                        <span class="text-sm text-gray-400">Initiated</span>
                        <span class="text-xl font-semibold mb-2">65.2k</span>
                        <div class="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg h-40 opacity-80"></div>
                    </div>
                    <div class="flex-1 flex flex-col items-center">
                        <span class="text-sm text-gray-400">Authorized</span>
                        <span class="text-xl font-semibold mb-2">54.8k</span>
                        <div class="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg h-32 opacity-60"></div>
                    </div>
                    <div class="flex-1 flex flex-col items-center relative">
                        <span class="text-sm text-gray-400">Successful</span>
                        <span class="text-xl font-semibold mb-2">48.6k</span>
                        <div class="w-full bg-blue-700 rounded-t-lg h-24 shadow-lg shadow-blue-200"></div>
                        <div class="absolute -top-4 bg-white/90 backdrop-blur shadow-xl border border-gray-100 rounded-full px-3 py-1 text-[10px] whitespace-nowrap z-10">
                            48.6k transactions | <span class="text-green-600 font-bold">89%</span> Drop-off: <span
                                class="text-red-500">-11%</span>
                        </div>
                    </div>
                </div>

                <div class="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3">
                    <div class="text-blue-500">✨</div>
                    <input
                            class="bg-transparent flex-1 outline-none text-sm text-blue-900"
                            placeholder="I want to know what caused the drop-off..."
                            type="text"
                    />
                </div>
            </div>

            <div class="col-span-4 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-medium">Gross Volume</h3>
                    <button class="text-gray-400">
                        <MoreHorizontal/>
                    </button>
                </div>
                <div class="flex items-baseline gap-2 mb-8">
                    <span class="text-5xl font-bold">$41,540</span>
                    <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">▲ 15%</span>
                </div>

                <div class="space-y-6">
                    <div>
                        <div class="flex justify-between text-sm mb-2">
                            <span class="text-gray-500">Online Payments</span>
                            <span class="font-bold">$26,800</span>
                        </div>
                        <div class="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                            <div class="bg-green-400 h-full w-[65%]"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-sm mb-2">
                            <span class="text-gray-500">Subscriptions</span>
                            <span class="font-bold">$10,400</span>
                        </div>
                        <div class="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                            <div class="bg-blue-400 h-full w-[35%]"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="main-wrapper">
        <h1>MAIN</h1>
    </div>
</section>

<style>
    :global(body) {
        background-color: #F4F5F7;
    }

    section {
        display: flex;
    }

    .side {
        max-width: 400px;
        background: #ffffff;
    }

    .main-wrapper {
        display: flex;
    }

    button {
        width: 100%;
    }
</style>